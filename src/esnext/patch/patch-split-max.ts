/* eslint-disable unicorn/consistent-destructuring */
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

import {
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference/difference.ts';
import { text1 as diffText1 } from '../difference/text1.ts';
import { text2 as diffText2 } from '../difference/text2.ts';

import { type Patch, type PatchInternal } from './types.ts';

/**
 * Break up patches that are longer than the maximum limit of the match algorithm.
 *
 * Large patches need to be split into smaller ones to ensure they can be
 * efficiently matched and applied using the Bitap algorithm, which has a
 * maximum pattern length limit.
 *
 * @param patches - Array of patches to split (modified in place)
 * @param options - Internal patch options containing maxBits and margin settings
 * @internal
 */
export function patchSplitMax(patches: Patch[], options: PatchInternal): void {
  const patchSize = options.maxBits;

  for (let x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patchSize) {
      continue;
    }

    const bigpatch = patches[x];
    // Remove the big old patch.
    patches.splice(x--, 1);
    let { start1, start2 } = bigpatch;
    let precontext = '';

    while (bigpatch.diffs.length > 0) {
      // Create one of several smaller patches.
      const patch: Patch = {
        diffs: [],
        start1: start1 - precontext.length,
        start2: start2 - precontext.length,
        length1: 0,
        length2: 0,
      };

      let empty = true;

      if (precontext !== '') {
        patch.length1 = precontext.length;
        patch.length2 = precontext.length;
        patch.diffs.push({ op: DIFFERENCE_EQUAL, text: precontext });
      }

      while (bigpatch.diffs.length > 0 && patch.length1 < patchSize - options.margin) {
        const diffType = bigpatch.diffs[0].op;
        let diffText = bigpatch.diffs[0].text;

        if (diffType === DIFFERENCE_INSERT) {
          // Insertions are harmless.
          patch.length2 += diffText.length;
          start2 += diffText.length;
          patch.diffs.push(bigpatch.diffs.shift()!);
          empty = false;
        } else if (
          diffType === DIFFERENCE_DELETE &&
          patch.diffs.length === 1 &&
          patch.diffs[0].op === DIFFERENCE_EQUAL &&
          diffText.length > 2 * patchSize
        ) {
          // This is a large deletion. Let it pass in one chunk.
          patch.length1 += diffText.length;
          start1 += diffText.length;
          empty = false;
          patch.diffs.push({ op: diffType, text: diffText });
          bigpatch.diffs.shift();
        } else {
          // Deletion or equality. Only take as much as we can stomach.
          diffText = diffText.slice(0, patchSize - patch.length1 - options.margin);
          patch.length1 += diffText.length;
          start1 += diffText.length;

          if (diffType === DIFFERENCE_EQUAL) {
            patch.length2 += diffText.length;
            start2 += diffText.length;
          } else {
            empty = false;
          }

          patch.diffs.push({ op: diffType, text: diffText });

          if (diffText === bigpatch.diffs[0].text) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0] = {
              op: bigpatch.diffs[0].op,
              text: bigpatch.diffs[0].text.slice(diffText.length),
            };
          }
        }
      }

      // Compute the head context for the next patch.
      precontext = diffText2(patch.diffs);
      precontext = precontext.slice(precontext.length - options.margin);

      // Append the end context for this patch.
      const postcontext = diffText1(bigpatch.diffs).slice(0, options.margin);

      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;

        if (patch.diffs.length > 0 && patch.diffs.at(-1)!.op === DIFFERENCE_EQUAL) {
          patch.diffs[patch.diffs.length - 1] = {
            op: DIFFERENCE_EQUAL,
            text: patch.diffs.at(-1)!.text + postcontext,
          };
        } else {
          patch.diffs.push({ op: DIFFERENCE_EQUAL, text: postcontext });
        }
      }

      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
}
