import { create2DArray } from './create-2d-array.ts';

/**
 * @group String
 * @category Fuzzy Match
 */
export type LongestCommonSubstringOptions = {
  /** compare the two strings in case insensitive mode */
  caseInsensitive?: boolean;
};

/**
 * Implementation of [Longest Common Substring](https://en.wikipedia.org/wiki/Longest_common_substring_problem) algorithm.
 *
 * Returns the longest possible substring that is substring of both of given strings.
 *
 * @param string1 - First string.
 * @param string2 - Second string.
 * @returns A string that is common to both strings such that there is no
 * common substring with size greater than the length of the string.
 * @group String
 * @category Fuzzy Match
 */
export function longestCommonSubstring(
  string1: string,
  string2: string,
  { caseInsensitive = false }: LongestCommonSubstringOptions = {},
): string {
  const ci1 = caseInsensitive ? string1.toLocaleLowerCase() : string1;
  const ci2 = caseInsensitive ? string2.toLocaleLowerCase() : string2;

  const comparsions = create2DArray(ci1.length + 1, ci2.length + 1, 0);
  let maxSubStrLength = 0;
  let lastMaxSubStrIndex = -1;

  for (let i = 0; i < ci1.length; ++i) {
    const c1 = ci1.charAt(i);

    for (let j = 0; j < ci2.length; ++j) {
      const c2 = ci2.charAt(j);

      if (c1 === c2) {
        comparsions[i][j] = i > 0 && j > 0 ? comparsions[i - 1][j - 1] + 1 : 1;
      } else {
        comparsions[i][j] = 0;
      }

      if (comparsions[i][j] > maxSubStrLength) {
        maxSubStrLength = comparsions[i][j];
        lastMaxSubStrIndex = i;
      }
    }
  }

  return string1.slice(lastMaxSubStrIndex - maxSubStrLength + 1, lastMaxSubStrIndex + 1);
}
