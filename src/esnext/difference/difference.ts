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

import { create1dArray } from '../array/create1d-array.ts';
import { ceil } from '../math/ceil.ts';
import { commonPrefix } from '../string/common-prefix.ts';
import { commonSuffix } from '../string/common-suffix.ts';
import { ticksPerSecond } from '../time/constants.ts';
import { empty } from '../unicode/unicode.ts';

import { charsToLines } from './chars-to-lines.ts';
import { cleanupMerge } from './cleanup-merge.ts';
import { cleanupSemantic } from './cleanup-semantic.ts';
import { halfMatch } from './half-match.ts';
import { linesToChars } from './lines-to-chars.ts';

/**
 * Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * \@author fraser\@google.com (Neil Fraser)
 */

/**
 * Indicates deleted content in a {@link Difference}
 * @group String
 * @category Difference
 */
export const DIFFERENCE_DELETE = -1 as const;

/**
 * Indicates inserted content in a {@link Difference}
 * @group String
 * @category Difference
 */
export const DIFFERENCE_INSERT = 1 as const;

/**
 * Indicates unmodified content in a {@link Difference}
 * @group String
 * @category Difference
 */
export const DIFFERENCE_EQUAL = 0 as const;

/**
 * Represents one string difference.
 * @group String
 * @category Difference
 */
export type Difference = {
  /** Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL. */
  op: typeof DIFFERENCE_DELETE | typeof DIFFERENCE_INSERT | typeof DIFFERENCE_EQUAL;
  /** Text to be deleted, inserted, or retained. */
  text: string;
};

/**
 * Options for the {@link difference} function.
 * @group String
 * @category Difference
 */
export type DifferenceOptions = {
  /** timeout in seconds, use 0 for nno timeout */
  timeout?: number;
  /** Speedup flag. If true, dun a line-level diff first to identify the changed areas. */
  checkLines?: boolean;
  /** the edit cost */
  editCost?: number;
};

export type DiffInternal = Required<DifferenceOptions> & { deadline: number };

/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param text1 - Old string to be diffed.
 * @param text2 - New string to be diffed.
 * @param options - see {@link DifferenceOptions}
 * @returns Array of differences.
 * @group String
 * @category Difference
 */
export function difference(
  text1: string,
  text2: string,
  { timeout = 0, editCost = 4, checkLines = true }: DifferenceOptions = {},
): Difference[] {
  const deadline = timeout <= 0 ? Infinity : Date.now() + timeout * ticksPerSecond;

  return diff(text1, text2, { checkLines, timeout, deadline, editCost });
}

/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param text1 - Old string to be diffed.
 * @param text2 - New string to be diffed.
 * @param checkLines - Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param deadline - Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @returns Array of differences.
 * @internal
 */
function diff(text1: string, text2: string, options: DiffInternal): Difference[] {
  let str1 = text1;
  let str2 = text2;

  if (str1 === str2) {
    return str1 === empty ? [] : [{ op: DIFFERENCE_EQUAL, text: str1 }];
  }

  // Trim off common prefix (speedup).
  const prefix = commonPrefix(str1, str2);
  str1 = str1.slice(prefix.length);
  str2 = str2.slice(prefix.length);

  // Trim off common suffix (speedup).
  const suffix = commonSuffix(str1, str2);
  if (suffix.length > 0) {
    str1 = str1.slice(0, -suffix.length);
    str2 = str2.slice(0, -suffix.length);
  }

  // Compute the diff on the middle block.
  const diffs = compute(str1, str2, options);

  // Restore the prefix and suffix.
  if (prefix.length > 0) {
    diffs.unshift({ op: DIFFERENCE_EQUAL, text: prefix });
  }
  if (suffix.length > 0) {
    diffs.push({ op: DIFFERENCE_EQUAL, text: suffix });
  }

  cleanupMerge(diffs);
  return diffs;
}

/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param text1 - Old string to be diffed.
 * @param text2 - New string to be diffed.
 * @param checkLines - Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param deadline -Time when the diff should be complete by.
 * @returns Array of diff tuples.
 * @internal
 */
function compute(text1: string, text2: string, options: DiffInternal): Difference[] {
  if (text1 === empty) {
    // Just add some text (speedup).
    return [{ op: DIFFERENCE_INSERT, text: text2 }];
  }

  if (text2 === empty) {
    // Just delete some text (speedup).
    return [{ op: DIFFERENCE_DELETE, text: text1 }];
  }

  // Shorter text is inside the longer text (speedup).
  if (text1.length > text2.length) {
    const index = text1.indexOf(text2);
    if (index === -1) {
      if (text2.length === 1) {
        return [
          { op: DIFFERENCE_DELETE, text: text1 },
          { op: DIFFERENCE_INSERT, text: text2 },
        ];
      }
    } else {
      return [
        { op: DIFFERENCE_DELETE, text: text1.slice(0, index) },
        { op: DIFFERENCE_EQUAL, text: text2 },
        { op: DIFFERENCE_DELETE, text: text1.slice(index + text2.length) },
      ];
    }
  } else {
    const index = text2.indexOf(text1);
    if (index === -1) {
      if (text1.length === 1) {
        return [
          { op: DIFFERENCE_DELETE, text: text1 },
          { op: DIFFERENCE_INSERT, text: text2 },
        ];
      }
    } else {
      return [
        { op: DIFFERENCE_INSERT, text: text2.slice(0, index) },
        { op: DIFFERENCE_EQUAL, text: text1 },
        { op: DIFFERENCE_INSERT, text: text2.slice(index + text1.length) },
      ];
    }
  }

  // Check to see if the problem can be split in two.
  const hm = halfMatch(text1, text2, options);
  if (hm) {
    // A half-match was found, sort out the return data.
    const [text1a, text1b, text2a, text2b, midCommon] = hm;
    // Send both pairs off for separate processing.
    const diffsA = diff(text1a, text2a, options);
    const diffsB = diff(text1b, text2b, options);
    // Merge the results.
    return diffsA.concat([{ op: DIFFERENCE_EQUAL, text: midCommon }], diffsB);
  }

  if (options.checkLines && text1.length > 100 && text2.length > 100) {
    return lineMode(text1, text2, options);
  }

  return bisect(text1, text2, options);
}

/**
 * Do a quick line-level diff on both strings, then re-diff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param text1 - Old string to be diffed.
 * @param text2 - New string to be diffed.
 * @param deadline - Time when the diff should be complete by.
 * @returns Array of diff tuples.
 * @internal
 */
function lineMode(text1: string, text2: string, options: DiffInternal): Difference[] {
  // Scan the text on a line-by-line basis first.
  const a = linesToChars(text1, text2);
  // eslint-disable-next-line no-param-reassign
  text1 = a.chars1;
  // eslint-disable-next-line no-param-reassign
  text2 = a.chars2;
  const { lineArray } = a;

  const diffs = diff(text1, text2, { ...options, checkLines: false });

  // Convert the diff back to original text.
  charsToLines(diffs, lineArray);
  // Eliminate freak matches (e.g. blank lines)
  cleanupSemantic(diffs);

  // Re-diff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push({ op: DIFFERENCE_EQUAL, text: empty });
  let pointer = 0;
  let countDelete = 0;
  let countInsert = 0;
  let textDelete = empty;
  let textInsert = empty;
  while (pointer < diffs.length) {
    switch (diffs[pointer].op) {
      case DIFFERENCE_INSERT: {
        countInsert++;
        textInsert += diffs[pointer].text;
        break;
      }
      case DIFFERENCE_DELETE: {
        countDelete++;
        textDelete += diffs[pointer].text;
        break;
      }
      case DIFFERENCE_EQUAL: {
        // Upon reaching an equality, check for prior redundancies.
        if (countDelete >= 1 && countInsert >= 1) {
          // Delete the offending records and add the merged ones.
          diffs.splice(pointer - countDelete - countInsert, countDelete + countInsert);
          pointer = pointer - countDelete - countInsert;
          const subDiff = diff(textDelete, textInsert, { ...options, checkLines: false });
          for (let j = subDiff.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, subDiff[j]);
          }
          pointer += subDiff.length;
        }
        countInsert = 0;
        countDelete = 0;
        textDelete = empty;
        textInsert = empty;
        break;
      }

      //no default
    }
    pointer++;
  }
  diffs.pop(); // Remove the dummy entry at the end.

  return diffs;
}

/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param text1 - Old string to be diffed.
 * @param text2 - New string to be diffed.
 * @param options - see {@link DiffInternal}.
 * @returns Array of differences.
 * @internal
 */
function bisect(text1: string, text2: string, options: DiffInternal): Difference[] {
  // Cache the text lengths to prevent multiple calls.
  const text1Length = text1.length;
  const text2Length = text2.length;
  const maxD = ceil((text1Length + text2Length) / 2);
  const vOffset = maxD;
  const vLength = 2 * maxD;

  const v1 = create1dArray(vLength, -1);
  const v2 = create1dArray(vLength, -1);
  v1[vOffset + 1] = 0;
  v2[vOffset + 1] = 0;

  const delta = text1Length - text2Length;

  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  const front = delta % 2 !== 0;

  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  let k1start = 0;
  let k1end = 0;
  let k2start = 0;
  let k2end = 0;

  for (let d = 0; d < maxD; ++d) {
    // Bail out if deadline is reached.
    /* v8 ignore next 3 */
    if (Date.now() > options.deadline) {
      break;
    }

    // Walk the front path one step.
    for (let k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      const k1Offset = vOffset + k1;
      let x1 =
        k1 === -d || (k1 !== d && v1[k1Offset - 1] < v1[k1Offset + 1]) ?
          v1[k1Offset + 1]
        : v1[k1Offset - 1] + 1;
      let y1 = x1 - k1;
      while (x1 < text1Length && y1 < text2Length && text1.charAt(x1) === text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1Offset] = x1;
      if (x1 > text1Length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2Length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        const k2Offset = vOffset + delta - k1;
        if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {
          // Mirror x2 onto top-left coordinate system.
          const x2 = text1Length - v2[k2Offset];
          if (x1 >= x2) {
            // Overlap detected.
            return bisectSplit(text1, text2, x1, y1, options);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (let k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      const k2Offset = vOffset + k2;
      let x2 =
        k2 === -d || (k2 !== d && v2[k2Offset - 1] < v2[k2Offset + 1]) ?
          v2[k2Offset + 1]
        : v2[k2Offset - 1] + 1;
      let y2 = x2 - k2;
      while (
        x2 < text1Length &&
        y2 < text2Length &&
        text1.charAt(text1Length - x2 - 1) === text2.charAt(text2Length - y2 - 1)
      ) {
        x2++;
        y2++;
      }
      v2[k2Offset] = x2;
      if (x2 > text1Length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2Length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        const k1Offset = vOffset + delta - k2;
        if (k1Offset >= 0 && k1Offset < vLength && v1[k1Offset] !== -1) {
          const x1 = v1[k1Offset];
          const y1 = vOffset + x1 - k1Offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1Length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return bisectSplit(text1, text2, x1, y1, options);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [
    { op: DIFFERENCE_DELETE, text: text1 },
    { op: DIFFERENCE_INSERT, text: text2 },
  ];
}

/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param text1 - Old string to be diffed.
 * @param text2 - New string to be diffed.
 * @param x - Index of split point in text1.
 * @param y - Index of split point in text2.
 * @param deadline - Time at which to bail if not yet complete.
 * @returns Array of diff tuples.
 * @internal
 */
function bisectSplit(
  text1: string,
  text2: string,
  x: number,
  y: number,
  options: DiffInternal,
): Difference[] {
  const text1a = text1.slice(0, Math.max(0, x));
  const text2a = text2.slice(0, Math.max(0, y));
  const text1b = text1.slice(Math.max(0, x));
  const text2b = text2.slice(Math.max(0, y));

  // Compute both diffs serially.
  const diffs = diff(text1a, text2a, { ...options, checkLines: false });
  const diffsB = diff(text1b, text2b, { ...options, checkLines: false });

  return diffs.concat(diffsB);
}
