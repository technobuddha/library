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

import { type Difference, DIFFERENCE_INSERT } from './difference.ts';

/**
 * Compute and return the source text (all equalities and deletions).
 *
 * Reconstructs the original text from a diff by concatenating all
 * equality and deletion operations (effectively text1 before changes).
 *
 * @param diffs - Array of differences
 * @returns The source text (text1)
 * @group String
 * @category Difference
 */
export function text1(diffs: Difference[]): string {
  const text: string[] = [];
  for (const diff of diffs) {
    if (diff.op !== DIFFERENCE_INSERT) {
      text.push(diff.text);
    }
  }
  return text.join('');
}
