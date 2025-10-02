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

import { cleanupEfficiency } from '../difference/cleanup-efficiency.ts';
import { cleanupSemantic } from '../difference/cleanup-semantic.ts';
import {
  type Difference,
  difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference/difference.ts';
import { text1 as diffText1 } from '../difference/text1.ts';

import { patchAddContext } from './patch-add-context.ts';
import { type Patch, type PatchInternal } from './types.ts';

/**
 * Compute a list of patches to turn text1 into text2.
 *
 * This function can be called in multiple ways depending on available data:
 * - With text1 and text2: computes diffs internally
 * - With only diffs: reconstructs text1 from diffs
 * - With text1 and diffs: uses provided diffs (optimal)
 *
 * @param text1 - Old text (or undefined if only diffs provided)
 * @param text2OrDiffs - New text or array of differences
 * @param options - Internal patch options
 * @returns Array of patch objects
 * @internal
 */
export function patchMake(
  text1: string | undefined,
  text2OrDiffs: string | Difference[],
  options: PatchInternal,
): Patch[] {
  let sourceText: string;
  let diffs: Difference[];

  // Determine which calling method was used
  if (typeof text1 === 'string' && typeof text2OrDiffs === 'string') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    sourceText = text1;
    diffs = difference(text1, text2OrDiffs, {
      timeout: options.timeout,
      checkLines: true,
      editCost: options.editCost,
    });

    if (diffs.length > 2) {
      cleanupSemantic(diffs);
      cleanupEfficiency(diffs, options.editCost);
    }
  } else if (text1 === undefined && Array.isArray(text2OrDiffs)) {
    // Method 2: diffs only
    // Compute text1 from diffs.
    diffs = text2OrDiffs;
    sourceText = diffText1(diffs);
  } else if (typeof text1 === 'string' && Array.isArray(text2OrDiffs)) {
    // Method 3: text1, diffs (optimal)
    sourceText = text1;
    diffs = text2OrDiffs;
  } else {
    throw new TypeError('Unknown call format to patchMake.');
  }

  if (diffs.length === 0) {
    return []; // No changes, no patches needed.
  }

  const patches: Patch[] = [];
  let patch: Patch = {
    diffs: [],
    start1: 0,
    start2: 0,
    length1: 0,
    length2: 0,
  };

  let patchDiffLength = 0;
  let charCount1 = 0; // Number of characters into the text1 string.
  let charCount2 = 0; // Number of characters into the text2 string.

  // Start with text1 (prepatchText) and apply the diffs until we arrive at
  // text2 (postpatchText). We recreate the patches one by one to determine
  // context info.
  let prepatchText = sourceText;
  let postpatchText = sourceText;

  for (const diff of diffs) {
    const diffType = diff.op;
    const diffText = diff.text;

    if (patchDiffLength === 0 && diffType !== DIFFERENCE_EQUAL) {
      // A new patch starts here.
      patch.start1 = charCount1;
      patch.start2 = charCount2;
    }

    switch (diffType) {
      case DIFFERENCE_INSERT: {
        patch.diffs[patchDiffLength++] = diff;
        patch.length2 += diffText.length;
        postpatchText =
          postpatchText.slice(0, charCount2) + diffText + postpatchText.slice(charCount2);
        break;
      }
      case DIFFERENCE_DELETE: {
        patch.length1 += diffText.length;
        patch.diffs[patchDiffLength++] = diff;
        postpatchText =
          postpatchText.slice(0, charCount2) + postpatchText.slice(charCount2 + diffText.length);
        break;
      }
      case DIFFERENCE_EQUAL: {
        if (diffText.length <= 2 * options.margin && patchDiffLength && diff !== diffs.at(-1)) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diff;
          patch.length1 += diffText.length;
          patch.length2 += diffText.length;
        } else if (diffText.length >= 2 * options.margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            patchAddContext(patch, prepatchText, options);
            patches.push(patch);
            patch = {
              diffs: [],
              start1: 0,
              start2: 0,
              length1: 0,
              length2: 0,
            };
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatchText = postpatchText;
            charCount1 = charCount2;
          }
        }
        break;
      }

      // no default
    }

    // Update the current character count.
    if (diffType !== DIFFERENCE_INSERT) {
      charCount1 += diffText.length;
    }
    if (diffType !== DIFFERENCE_DELETE) {
      charCount2 += diffText.length;
    }
  }

  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    patchAddContext(patch, prepatchText, options);
    patches.push(patch);
  }

  return patches;
}
