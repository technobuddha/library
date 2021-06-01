import create2DArray from './create2DArray';

export type Options<T> = {
    /**
     * Function that acts as a custom comparator
     * for the array objects. Function should return true if objects are equal, otherwise false.
     *
     */
    compare?: (a: T, b: T) => boolean;
    /**
     * Function used to decide what to return
     * as a result subsequence. It accepts 2 arguments: index of common element
     * in the first array and index in the second. The default function returns
     * element from the first array.
     */
    collect?: (i1: number, i2: number) => T;
};

/**
 * Implementation of Longest Common Subsequence problem.
 * http://en.wikipedia.org/wiki/Longest_common_subsequence
 *
 * Returns the longest possible array that is subarray of both of given arrays.
 *
 * @param array1 First array of objects.
 * @param array2 Second array of objects.
 * @param __namedParameters see {@link Options}
 * @default compare equality comparison
 * @default collect basic collector
 * @returns A list of objects that are common to both arrays
 * such that there is no common subsequence with size greater than the
 * length of the list.
 */
export function longestCommonSubsequence<T>(array1: ArrayLike<T>, array2: ArrayLike<T>, { compare = (a, b) => a === b, collect = (i1, _i2) => array1[i1] }: Options<T> = {}): T[] {
    const l1 = array1.length;
    const l2 = array2.length;
    const c  = create2DArray(l1 + 1, l2 + 1, 0);

    let i: number;
    let j: number;

    for(i = 1; i <= l1; i++) {
        for(j = 1; j <= l2; j++) {
            if(compare(array1[i - 1], array2[j - 1]))
                c[i][j] = c[i - 1][j - 1] + 1;
            else
                c[i][j] = Math.max(c[i - 1][j], c[i][j - 1]);
        }
    }

    const result = [] as T[];
    i = l1;
    j = l2;

    while(i > 0 && j > 0) {
        if(compare(array1[i - 1], array2[j - 1])) {
            result.unshift(collect(i - 1, j - 1));
            i--;
            j--;
        } else if(c[i - 1][j] > c[i][j - 1]) { i--; } else { j--; }
    }

    return result;
}

export default longestCommonSubsequence;
