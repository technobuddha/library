import { commonPrefix } from '../common-prefix.ts';
import { commonSuffix } from '../common-suffix.ts';
import { empty } from '../unicode.ts';

import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from './difference.ts';

/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param diffs - Array of diff tuples.
 */
export function cleanupMerge(diffs: Diff[]): void {
  // Add a dummy entry at the end.
  diffs.push({ op: DIFF_EQUAL, text: empty });
  let pointer = 0;
  let countDelete = 0;
  let countInsert = 0;
  let textDelete = empty;
  let textInsert = empty;

  while (pointer < diffs.length) {
    switch (diffs[pointer].op) {
      case DIFF_INSERT: {
        countInsert++;
        textInsert += diffs[pointer].text;
        pointer++;
        break;
      }
      case DIFF_DELETE: {
        countDelete++;
        textDelete += diffs[pointer].text;
        pointer++;
        break;
      }
      case DIFF_EQUAL: {
        // Upon reaching an equality, check for prior redundancies.
        if (countDelete + countInsert > 1) {
          if (countDelete > 0 && countInsert > 0) {
            // Factor out any common prefixes.
            const prefix = commonPrefix(textInsert, textDelete);
            if (prefix.length > 0) {
              if (
                pointer - countDelete - countInsert > 0 &&
                diffs[pointer - countDelete - countInsert - 1].op === DIFF_EQUAL
              ) {
                diffs[pointer - countDelete - countInsert - 1].text += textInsert.slice(
                  0,
                  prefix.length,
                );
              } else {
                diffs.splice(0, 0, {
                  op: DIFF_EQUAL,
                  text: textInsert.slice(0, prefix.length),
                });
                pointer++;
              }
              textInsert = textInsert.slice(prefix.length);
              textDelete = textDelete.slice(prefix.length);
            }
            // Factor out any common suffixes.
            const suffix = commonSuffix(textInsert, textDelete);
            if (suffix.length > 0) {
              diffs[pointer].text = textInsert.slice(-suffix.length) + diffs[pointer].text;
              textInsert = textInsert.slice(0, -suffix.length);
              textDelete = textDelete.slice(0, -suffix.length);
            }
          }
          // Delete the offending records and add the merged ones.
          pointer -= countDelete + countInsert;
          diffs.splice(pointer, countDelete + countInsert);
          if (textDelete.length > 0) {
            diffs.splice(pointer, 0, { op: DIFF_DELETE, text: textDelete });
            pointer++;
          }
          if (textInsert.length > 0) {
            diffs.splice(pointer, 0, { op: DIFF_INSERT, text: textInsert });
            pointer++;
          }
          pointer++;
        } else if (pointer !== 0 && diffs[pointer - 1].op === DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1].text += diffs[pointer].text;
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        countInsert = 0;
        countDelete = 0;
        textDelete = empty;
        textInsert = empty;
        break;
      }

      // no default
    }
  }

  if (diffs.at(-1)!.text === empty) {
    diffs.pop(); // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  let changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1].op === DIFF_EQUAL && diffs[pointer + 1].op === DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (
        diffs[pointer].text.slice(
          Math.max(0, diffs[pointer].text.length - diffs[pointer - 1].text.length),
        ) === diffs[pointer - 1].text
      ) {
        // Shift the edit over the previous equality.
        diffs[pointer].text =
          diffs[pointer - 1].text +
          diffs[pointer].text.slice(
            0,
            Math.max(0, diffs[pointer].text.length - diffs[pointer - 1].text.length),
          );
        diffs[pointer + 1].text = diffs[pointer - 1].text + diffs[pointer + 1].text;
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (
        diffs[pointer].text.slice(0, Math.max(0, diffs[pointer + 1].text.length)) ===
        diffs[pointer + 1].text
      ) {
        // Shift the edit over the next equality.
        diffs[pointer - 1].text += diffs[pointer + 1].text;
        diffs[pointer].text =
          diffs[pointer].text.slice(diffs[pointer + 1].text.length) + diffs[pointer + 1].text;
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    cleanupMerge(diffs);
  }
}
