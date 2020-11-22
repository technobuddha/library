import { empty }        from './constants';
import create2DArray    from './create2DArray';

/**
 * Implementation of Longest Common Substring problem.
 * https://en.wikipedia.org/wiki/Longest_common_substring_problem
 *
 * Returns the longest possible substring that is substring of both of given strings.
 *
 * @param array1 First string.
 * @param array2 Second string.
 * @returns A string that is common to both strings such that there is no
 * common substring with size greater than the length of the string.
 */
export function longestCommonSubstring(string1: string, string2: string): string {
    const comparsions = create2DArray(string1.length + 1, string2.length + 1, 0);
    let maxSubStrLength = 0;
    let lastMaxSubStrIndex = -1;

    for(let i = 0; i < string1.length; ++i) {
        const c1 = string1.charAt(i);

        for(let j = 0; j < string2.length; ++j) {
            const c2 = string2.charAt(j);

            if(c1 === c2) {
                if(i > 0 && j > 0)
                    comparsions[i][j] = comparsions[i - 1][j - 1] + 1;
                else
                    comparsions[i][j] = 1;
            }
            else
                comparsions[i][j] = 0;

            if(comparsions[i][j] > maxSubStrLength)
            {
                maxSubStrLength = comparsions[i][j];
                lastMaxSubStrIndex = i;
            }
        }
    }

    if(maxSubStrLength > 0)
        return string1.substr(lastMaxSubStrIndex - maxSubStrLength + 1, maxSubStrLength);
    else
        return empty;
}

export default longestCommonSubstring;
