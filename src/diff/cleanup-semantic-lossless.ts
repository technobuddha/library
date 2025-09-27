import { commonSuffix } from '../common-suffix.ts';

import { type Diff, DIFF_EQUAL } from './difference.ts';

const nonAlphaNumericRegex = /[^a-zA-Z\d]/u;
const whitespaceRegex = /\s/u;
const linebreakRegex = /[\r\n]/u;
const blanklineEndRegex = /\n\r?\n$/u;
const blanklineStartRegex = /^\r?\n\r?\n/u;

/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -\> The <ins>cat </ins>came.
 * @param diffs - Array of diff tuples.
 */
export function cleanupSemanticLossless(diffs: Diff[]): void {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param one - First string.
   * @param two - Second string.
   * @returns The score.
   * @internal
   */
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function cleanupSemanticScore(one: string, two: string): number {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    const char1 = one.at(-1)!;
    const char2 = two.charAt(0);
    const nonAlphaNumeric1 = nonAlphaNumericRegex.exec(char1);
    const nonAlphaNumeric2 = nonAlphaNumericRegex.exec(char2);
    const whitespace1 = nonAlphaNumeric1 && whitespaceRegex.exec(char1);
    const whitespace2 = nonAlphaNumeric2 && whitespaceRegex.exec(char2);
    const lineBreak1 = whitespace1 && linebreakRegex.exec(char1);
    const lineBreak2 = whitespace2 && linebreakRegex.exec(char2);
    const blankLine1 = lineBreak1 && blanklineEndRegex.exec(one);
    const blankLine2 = lineBreak2 && blanklineStartRegex.exec(two);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  let pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1].op === DIFF_EQUAL && diffs[pointer + 1].op === DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      let equality1 = diffs[pointer - 1].text;
      let edit = diffs[pointer].text;
      let equality2 = diffs[pointer + 1].text;
      // First, shift the edit as far left as possible.
      const commonOffset = commonSuffix(equality1, edit).length;
      if (commonOffset) {
        const commonString = edit.slice(Math.max(0, edit.length - commonOffset));
        equality1 = equality1.slice(0, Math.max(0, equality1.length - commonOffset));
        edit = commonString + edit.slice(0, Math.max(0, edit.length - commonOffset));
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      let bestEquality1 = equality1;
      let bestEdit = edit;
      let bestEquality2 = equality2;
      let bestScore = cleanupSemanticScore(equality1, edit) + cleanupSemanticScore(edit, equality2);
      while (edit.length > 0 && equality2.length > 0 && equality2.startsWith(edit.charAt(0))) {
        equality1 += edit.charAt(0);
        edit = edit.slice(1) + equality2.charAt(0);
        equality2 = equality2.slice(1);
        const score = cleanupSemanticScore(equality1, edit) + cleanupSemanticScore(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1].text !== bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1].text = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer].text = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1].text = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
}
