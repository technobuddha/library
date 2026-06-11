/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DIFFERENCE_EQUAL } from '../difference/difference.ts';

import { type Patch, type PatchInternal } from './types.ts';

/**
 * Add padding on text start and end so that edges can match something.
 *
 * This function adds unique padding characters to the beginning and end
 * of patches to ensure that edge cases (patches at the very start or end
 * of text) can be properly matched and applied.
 *
 * @param patches - Array of patches to add padding to (modified in place)
 * @param options - Internal patch options containing margin setting
 * @returns The padding string that was added to each side
 * @internal
 */
export function patchAddPadding(patches: Patch[], options: PatchInternal): string {
  const paddingLength = options.margin;
  let nullPadding = '';
  for (let x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (const patch of patches) {
    patch.start1 += paddingLength;
    patch.start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  let [patch] = patches;
  let { diffs } = patch;
  if (diffs.length === 0 || diffs[0].op !== DIFFERENCE_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift({ op: DIFFERENCE_EQUAL, text: nullPadding });
    patch.start1 -= paddingLength; // Should be 0.
    patch.start2 -= paddingLength; // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0].text.length) {
    // Grow first equality.
    const extraLength = paddingLength - diffs[0].text.length;
    diffs[0] = {
      op: DIFFERENCE_EQUAL,
      text: nullPadding.slice(diffs[0].text.length) + diffs[0].text,
    };
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches.at(-1)!;
  ({ diffs } = patch);
  if (diffs.length === 0 || diffs.at(-1)!.op !== DIFFERENCE_EQUAL) {
    // Add nullPadding equality.
    diffs.push({ op: DIFFERENCE_EQUAL, text: nullPadding });
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs.at(-1)!.text.length) {
    // Grow last equality.
    const extraLength = paddingLength - diffs.at(-1)!.text.length;
    diffs[diffs.length - 1] = {
      op: DIFFERENCE_EQUAL,
      text: diffs.at(-1)!.text + nullPadding.slice(0, extraLength),
    };
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
}
