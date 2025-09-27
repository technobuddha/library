import { commonOverlap } from '../common-overlap.ts';

import { cleanupMerge } from './cleanup-merge.ts';
import { cleanupSemanticLossless } from './cleanup-semantic-lossless.ts';
import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from './difference.ts';

/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param diffs - Array of differences
 * @internal
 */
export function cleanupSemantic(diffs: Diff[]): void {
  let changes = false;

  const equalities: number[] = []; // Stack of indices where equalities are found.

  let lastEquality: string | null = null;
  // Always equal to diffs[equalities[equalities.length - 1]].text

  let pointer = 0; // Index of current position.

  // Number of characters that changed prior to the equality.
  let insertsBefore = 0;
  let deletesBefore = 0;

  // Number of characters that changed after the equality.
  let insertsAfter = 0;
  let deletesAfter = 0;

  while (pointer < diffs.length) {
    if (diffs[pointer].op === DIFF_EQUAL) {
      // Equality found.
      equalities.push(pointer);

      insertsBefore = insertsAfter;
      deletesBefore = deletesAfter;
      insertsAfter = 0;
      deletesAfter = 0;
      lastEquality = diffs[pointer].text;
    } else {
      // An insertion or deletion.
      if (diffs[pointer].op === DIFF_INSERT) {
        insertsAfter += diffs[pointer].text.length;
      } else {
        deletesAfter += diffs[pointer].text.length;
      }

      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (
        lastEquality &&
        lastEquality.length <= Math.max(insertsBefore, deletesBefore) &&
        lastEquality.length <= Math.max(insertsAfter, deletesAfter)
      ) {
        // Duplicate record.
        diffs.splice(equalities.at(-1)!, 0, { op: DIFF_DELETE, text: lastEquality });
        // Change second copy to insert.
        diffs[equalities.at(-1)! + 1].op = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalities.pop();
        // Throw away the previous equality (it needs to be reevaluated).
        equalities.pop();

        pointer = equalities.at(-1) ?? -1;
        insertsBefore = 0; // Reset the counters.
        deletesBefore = 0;
        insertsAfter = 0;
        deletesAfter = 0;
        lastEquality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    cleanupMerge(diffs);
  }
  cleanupSemanticLossless(diffs);

  // cspell:ignore abcxxx xxxdef xxxabc defxxx
  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    const prev = diffs[pointer - 1];
    const curr = diffs[pointer];

    if (prev.op === DIFF_DELETE && curr.op === DIFF_INSERT) {
      const deletion = prev.text;
      const insertion = curr.text;

      const overlapLength1 = commonOverlap(deletion, insertion).length;
      const overlapLength2 = commonOverlap(insertion, deletion).length;

      const iLen = insertion.length / 2;
      const dLen = deletion.length / 2;

      if (overlapLength1 >= overlapLength2) {
        if (overlapLength1 >= dLen || overlapLength1 >= iLen) {
          // Overlap found.  Insert an equality and trim the surrounding edits.

          diffs.splice(pointer, 0, { op: DIFF_EQUAL, text: insertion.slice(0, overlapLength1) });
          prev.text = deletion.slice(0, Math.max(0, deletion.length - overlapLength1));
          diffs[pointer + 1].text = insertion.slice(overlapLength1);

          pointer++;
        }
        /* v8 ignore next */
      } else if (overlapLength2 >= dLen || overlapLength2 >= iLen) {
        // Reverse overlap found.
        // Insert an equality and swap and trim the surrounding edits.
        diffs.splice(pointer, 0, {
          op: DIFF_EQUAL,
          text: deletion.slice(0, overlapLength2),
        });
        diffs[pointer - 1].op = DIFF_INSERT;
        diffs[pointer - 1].text = insertion.slice(0, insertion.length - overlapLength2);
        diffs[pointer + 1].op = DIFF_DELETE;
        diffs[pointer + 1].text = deletion.slice(deletion.length - overlapLength2);
        pointer++;
      }
      pointer++;
    }
    pointer++;
  }
}
