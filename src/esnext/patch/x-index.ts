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

import { type Difference, DIFFERENCE_DELETE, DIFFERENCE_INSERT } from '../difference/difference.ts';

/**
 * Compute the location in text2 that corresponds to a location in text1.
 *
 * Given a position in the original text (text1), calculates the equivalent
 * position in the modified text (text2) after applying all differences.
 *
 * @param diffs - Array of differences
 * @param loc - Location within text1
 * @returns Corresponding location within text2
 *
 * @example
 * ```typescript
 * // 'The cat' vs 'The big cat'
 * // Position 1 in text1 maps to position 1 in text2
 * // Position 5 in text1 maps to position 8 in text2
 * ```
 * @group String
 * @category Difference
 */
export function xIndex(diffs: Difference[], loc: number): number {
  let chars1 = 0;
  let chars2 = 0;
  let lastChars1 = 0;
  let lastChars2 = 0;

  for (const diff of diffs) {
    if (diff.op !== DIFFERENCE_INSERT) {
      // Equality or deletion.
      chars1 += diff.text.length;
    }
    if (diff.op !== DIFFERENCE_DELETE) {
      // Equality or insertion.
      chars2 += diff.text.length;
    }
    if (chars1 > loc) {
      // Overshot the location.
      break;
    }
    lastChars1 = chars1;
    lastChars2 = chars2;
  }

  // Was the location deleted?
  if (diffs.length > 0 && diffs.at(-1)!.op === DIFFERENCE_DELETE) {
    return lastChars2;
  }

  // Add the remaining character length.
  return lastChars2 + (loc - lastChars1);
}
