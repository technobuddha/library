import { ceil } from '../math/ceil.ts';
import { floor } from '../math/floor.ts';
import { commonPrefix } from '../string/common-prefix.ts';
import { commonSuffix } from '../string/common-suffix.ts';
import { empty } from '../unicode/unicode.ts';

import { type DiffInternal } from './difference.ts';

/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param text1 - First string.
 * @param text2 - Second string.
 * @returns Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @internal
 */
export function halfMatch(
  text1: string,
  text2: string,
  options: DiffInternal,
): readonly string[] | null {
  if (options.timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }

  const long = text1.length > text2.length ? text1 : text2;
  const short = text1.length > text2.length ? text2 : text1;
  if (long.length < 4 || short.length * 2 < long.length) {
    return null; // Pointless.
  }

  /**
   * Does a substring of shortText exist within longText such that the substring
   * is at least half the length of longText?
   * Closure, but does not reference any external variables.
   * @param longText - Longer string.
   * @param shortText - Shorter string.
   * @param i - Start index of quarter length substring within longText.
   * @returns Five element Array, containing the prefix of
   *     longText, the suffix of longText, the prefix of shortText, the suffix
   *     of shortText and the common middle.  Or null if there was no match.
   * @internal
   */
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function halfMatchI(longText: string, shortText: string, i: number): string[] | null {
    // Start with a 1/4 length substring at position i as a seed.
    const seed = longText.slice(i, i + floor(longText.length / 4));
    let j = -1;
    let bestCommon = empty;
    let bestLongTextA = empty;
    let bestLongTextB = empty;
    let bestShortTextA = empty;
    let bestShortTextB = empty;
    while ((j = shortText.indexOf(seed, j + 1)) !== -1) {
      const prefixLength = commonPrefix(
        longText.slice(Math.max(0, i)),
        shortText.slice(Math.max(0, j)),
      ).length;
      const suffixLength = commonSuffix(
        longText.slice(0, Math.max(0, i)),
        shortText.slice(0, Math.max(0, j)),
      ).length;
      if (bestCommon.length < suffixLength + prefixLength) {
        bestCommon = shortText.slice(j - suffixLength, j) + shortText.slice(j, j + prefixLength);
        bestLongTextA = longText.slice(0, Math.max(0, i - suffixLength));
        bestLongTextB = longText.slice(Math.max(0, i + prefixLength));
        bestShortTextA = shortText.slice(0, Math.max(0, j - suffixLength));
        bestShortTextB = shortText.slice(Math.max(0, j + prefixLength));
      }
    }
    if (bestCommon.length * 2 >= longText.length) {
      return [bestLongTextA, bestLongTextB, bestShortTextA, bestShortTextB, bestCommon];
    }
    return null;
  }

  // First check if the second quarter is the seed for a half-match.
  const hm1 = halfMatchI(long, short, ceil(long.length / 4));
  // Check again based on the third quarter.
  const hm2 = halfMatchI(long, short, ceil(long.length / 2));
  let hm: string[] | null;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (hm1) {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  } else {
    hm = hm2;
  }

  // A half-match was found, sort out the return data.
  let text1A: string;
  let text1B: string;
  let text2A: string;
  let text2B: string;
  let midCommon: string;
  if (text1.length > text2.length) {
    [text1A, text1B, text2A, text2B, midCommon] = hm!;
  } else {
    [text2A, text2B, text1A, text1B, midCommon] = hm!;
  }
  return [text1A, text1B, text2A, text2B, midCommon];
}
