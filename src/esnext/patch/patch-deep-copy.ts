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

import { type Patch } from './types.ts';

/**
 * Create a deep copy of an array of patches.
 *
 * This function creates completely independent copies of patches,
 * ensuring that modifications to the copies don't affect the originals.
 *
 * @param patches - Array of patches to copy
 * @returns A new array containing deep copies of all patches
 * @internal
 */
export function patchDeepCopy(patches: Patch[]): Patch[] {
  const patchesCopy: Patch[] = [];
  for (const patch of patches) {
    const patchCopy: Patch = {
      diffs: [],
      start1: patch.start1,
      start2: patch.start2,
      length1: patch.length1,
      length2: patch.length2,
    };
    for (const diff of patch.diffs) {
      patchCopy.diffs.push({ op: diff.op, text: diff.text });
    }
    patchesCopy.push(patchCopy);
  }
  return patchesCopy;
}
