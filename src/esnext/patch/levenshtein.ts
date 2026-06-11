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

import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference/difference.ts';

/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 *
 * This calculates the minimum number of single-character edits required
 * to transform one text into another.
 *
 * @param diffs - Array of differences
 * @returns Number of character changes
 * @group String
 * @category Difference
 */
export function levenshtein(diffs: Difference[]): number {
  let distance = 0;
  let insertions = 0;
  let deletions = 0;

  for (const diff of diffs) {
    switch (diff.op) {
      case DIFFERENCE_INSERT: {
        insertions += diff.text.length;
        break;
      }
      case DIFFERENCE_DELETE: {
        deletions += diff.text.length;
        break;
      }
      case DIFFERENCE_EQUAL: {
        // A deletion and an insertion is one substitution.
        distance += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
      }

      // no default
    }
  }

  distance += Math.max(insertions, deletions);
  return distance;
}
