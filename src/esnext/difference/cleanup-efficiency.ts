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

import { cleanupMerge } from './cleanup-merge.ts';
import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from './difference.ts';

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 *
 * This function looks for short equalities surrounded by edits and eliminates them
 * if they don't add significant value, which can reduce the total number of edit operations.
 *
 * @param diffs - Array of differences (modified in place)
 * @param editCost - Cost threshold for keeping an equality
 * @internal
 */
export function cleanupEfficiency(diffs: Difference[], editCost: number): void {
  let changes = false;
  const equalities: number[] = []; // Stack of indices where equalities are found.
  let equalitiesLength = 0; // Keeping our own length var is faster in JS.
  let lastEquality: string | null = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]].text
  let pointer = 0; // Index of current position.
  // Is there an insertion operation before the last equality.
  let preIns = false;
  // Is there a deletion operation before the last equality.
  let preDel = false;
  // Is there an insertion operation after the last equality.
  let postIns = false;
  // Is there a deletion operation after the last equality.
  let postDel = false;

  while (pointer < diffs.length) {
    if (diffs[pointer].op === DIFFERENCE_EQUAL) {
      // Equality found.
      if (diffs[pointer].text.length < editCost && (postIns || postDel)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        preIns = postIns;
        preDel = postDel;
        lastEquality = diffs[pointer].text;
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastEquality = null;
      }
      postIns = false;
      postDel = false;
    } else {
      // An insertion or deletion.
      if (diffs[pointer].op === DIFFERENCE_DELETE) {
        postDel = true;
      } else {
        postIns = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (
        lastEquality &&
        ((preIns && preDel && postIns && postDel) ||
          (lastEquality.length < editCost / 2 &&
            (preIns ? 1 : 0) + (preDel ? 1 : 0) + (postIns ? 1 : 0) + (postDel ? 1 : 0) === 3))
      ) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0, {
          op: DIFFERENCE_DELETE,
          text: lastEquality,
        });
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1] = {
          ...diffs[equalities[equalitiesLength - 1] + 1],
          op: DIFFERENCE_INSERT,
        };
        equalitiesLength--; // Throw away the equality we just deleted;
        lastEquality = null;
        if (preIns && preDel) {
          // No changes made which could affect previous entry, keep going.
          postIns = true;
          postDel = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--; // Throw away the previous equality.
          pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
          postIns = false;
          postDel = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    cleanupMerge(diffs);
  }
}
