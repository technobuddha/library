/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { cleanupSemanticLossless } from '../difference/cleanup-semantic-lossless.ts';
import { difference } from '../difference/difference.ts';
import { text1 as diffText1 } from '../difference/text1.ts';
import { text2 as diffText2 } from '../difference/text2.ts';
import { match } from '../match/match.ts';

import { levenshtein } from './levenshtein.ts';
import { patchAddPadding } from './patch-add-padding.ts';
import { patchDeepCopy } from './patch-deep-copy.ts';
import { patchSplitMax } from './patch-split-max.ts';
import { type Patch, type PatchInternal } from './types.ts';
import { xIndex } from './x-index.ts';

/**
 * Result of applying patches to text.
 * @group String
 * @category Patch
 */
export type PatchApplyResult = {
  /** The text after patches have been applied */
  text: string;
  /** Array of boolean values indicating which patches were successfully applied */
  results: boolean[];
};

/**
 * Merge a set of patches onto the text.
 *
 * Applies each patch in sequence, using fuzzy matching to locate the best
 * position for each patch. Returns the patched text and an array indicating
 * which patches were successfully applied.
 *
 * @param patches - Array of patches to apply
 * @param text - The text to patch
 * @param options - Internal patch options
 * @returns Object containing the patched text and success indicators
 * @internal
 */
export function patchApply(
  patches: Patch[],
  text: string,
  options: PatchInternal,
): PatchApplyResult {
  if (patches.length === 0) {
    return { text, results: [] };
  }

  // Deep copy the patches so that no changes are made to originals.
  const patchesCopy = patchDeepCopy(patches);

  const nullPadding = patchAddPadding(patchesCopy, options);
  let result = nullPadding + text + nullPadding;

  patchSplitMax(patchesCopy, options);

  // delta keeps track of the offset between the expected and actual location
  // of the previous patch. If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  let delta = 0;
  const results: boolean[] = [];

  for (let x = 0; x < patchesCopy.length; x++) {
    const expectedLoc = patchesCopy[x].start2 + delta;
    const text1 = diffText1(patchesCopy[x].diffs);
    let startLoc: number;
    let endLoc = -1;

    if (text1.length > options.maxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      startLoc = match(result, text1.slice(0, options.maxBits), expectedLoc);
      if (startLoc !== -1) {
        endLoc = match(
          result,
          text1.slice(text1.length - options.maxBits),
          expectedLoc + text1.length - options.maxBits,
        );
        if (endLoc === -1 || startLoc >= endLoc) {
          // Can't find valid trailing context. Drop this patch.
          startLoc = -1;
        }
      }
    } else {
      startLoc = match(result, text1, expectedLoc);
    }

    if (startLoc === -1) {
      // No match found. :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patchesCopy[x].length2 - patchesCopy[x].length1;
    } else {
      // Found a match. :)
      results[x] = true;
      delta = startLoc - expectedLoc;

      const text2 =
        endLoc === -1 ?
          result.slice(startLoc, startLoc + text1.length)
        : result.slice(startLoc, endLoc + options.maxBits);

      if (text1 === text2) {
        // Perfect match, just shove the replacement text in.
        result =
          result.slice(0, startLoc) +
          diffText2(patchesCopy[x].diffs) +
          result.slice(startLoc + text1.length);
      } else {
        // Imperfect match. Run a diff to get a framework of equivalent indices.
        const diffs = difference(text1, text2, {
          timeout: 0,
          checkLines: false,
          editCost: options.editCost,
        });

        if (
          text1.length > options.maxBits &&
          levenshtein(diffs) / text1.length > options.deleteThreshold
        ) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          cleanupSemanticLossless(diffs);
          let index1 = 0;

          for (const mod of patchesCopy[x].diffs) {
            if (mod.op !== 0) {
              // Not DIFFERENCE_EQUAL
              const index2 = xIndex(diffs, index1);

              if (mod.op === 1) {
                // DIFFERENCE_INSERT
                result =
                  result.slice(0, startLoc + index2) + mod.text + result.slice(startLoc + index2);
              } else if (mod.op === -1) {
                // DIFFERENCE_DELETE
                result =
                  result.slice(0, startLoc + index2) +
                  result.slice(startLoc + xIndex(diffs, index1 + mod.text.length));
              }
            }

            if (mod.op !== -1) {
              // Not DIFFERENCE_DELETE
              index1 += mod.text.length;
            }
          }
        }
      }
    }
  }

  // Strip the padding off.
  result = result.slice(nullPadding.length, result.length - nullPadding.length);
  return { text: result, results };
}
