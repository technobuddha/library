import { create2dArray } from '../array/create2d-array.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for configuring the longest common substring calculation.
 * @group String
 * @category Commonality
 */
export type LongestCommonSubstringOptions = {
  /** compare the two strings in case insensitive mode */
  caseInsensitive?: boolean;
};

/**
 * Implementation of [Longest Common Substring](https://en.wikipedia.org/wiki/Longest_common_substring_problem) algorithm.
 *
 * Returns the longest possible substring that is substring of both of given strings.
 * @param string1 - First string.
 * @param string2 - Second string.
 * @returns A string that is common to both strings such that there is no
 * common substring with size greater than the length of the string.
 * @group String
 * @category Commonality
 */
export function longestCommonSubstring(
  string1: StringLike,
  string2: StringLike,
  { caseInsensitive = false }: LongestCommonSubstringOptions = {},
): string {
  const ci1 = caseInsensitive ? toString(string1).toLocaleLowerCase() : toString(string1);
  const ci2 = caseInsensitive ? toString(string2).toLocaleLowerCase() : toString(string2);

  const comparisons = create2dArray(ci1.length + 1, ci2.length + 1, 0);
  let maxSubStrLength = 0;
  let lastMaxSubStrIndex = -1;

  for (let i = 0; i < ci1.length; ++i) {
    const c1 = ci1.charAt(i);

    for (let j = 0; j < ci2.length; ++j) {
      const c2 = ci2.charAt(j);

      if (c1 === c2) {
        comparisons[i][j] = i > 0 && j > 0 ? comparisons[i - 1][j - 1] + 1 : 1;
      } else {
        comparisons[i][j] = 0;
      }

      if (comparisons[i][j] > maxSubStrLength) {
        maxSubStrLength = comparisons[i][j];
        lastMaxSubStrIndex = i;
      }
    }
  }

  return string1.slice(lastMaxSubStrIndex - maxSubStrLength + 1, lastMaxSubStrIndex + 1);
}
