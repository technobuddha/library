import { countOnes } from '../binary/count-ones.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { isStringLike } from './is-string-like.ts';
import { type StringLike } from './string-like.ts';

/**
 * Calculates the Hamming distance between two strings.
 *
 * The Hamming distance is the number of positions at which the corresponding characters are different. It is only defined for strings of equal length.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @returns The Hamming distance (non-negative integer).
 *
 * @example
 * ```ts
 * import { hammingDistance } from "@technobuddha/library";
 *
 * hammingDistance("karolin", "kathrin"); // 3
 * hammingDistance("karolin", "kerstin"); // 3
 * hammingDistance("1011101", "1001001"); // 2
 * ```
 */
export function hammingDistance(a: StringLike, b: StringLike): number;
/**
 * Calculates the Hamming distance between two numbers (bitwise).
 *
 * The Hamming distance is the number of differing bits between two 32-bit integers.
 *
 * @param a - The first number to compare.
 * @param b - The second number to compare.
 * @returns The Hamming distance (non-negative integer).
 *
 * @example
 * ```ts
 * import { hammingDistance } from "@technobuddha/library";
 *
 * hammingDistance(101, 105); // 2
 * ```
 */
export function hammingDistance(a: NumberLike, b: NumberLike): number;
/**
 * Calculates the Hamming distance between two arrays.
 *
 * The Hamming distance is the number of positions at which the corresponding elements are different. It is only defined for arrays of equal length.
 * @typeParam T - The type of array elements.
 * @param a - The first array to compare.
 * @param b - The second array to compare.
 * @returns The Hamming distance (non-negative integer).
 *
 * @example
 * ```ts
 * import { hammingDistance } from "@technobuddha/library";
 *
 * hammingDistance([1,2,3], [1,2,4]); // 1
 * ```
 */
export function hammingDistance<T>(a: T[], b: T[]): number;
/**
 * Calculates the Hamming distance.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns The Hamming distance.
 * @group String
 * @category Distance
 */
export function hammingDistance<T>(a: StringLike | NumberLike | T[], b: typeof a): number {
  if ((isStringLike(a) || Array.isArray(a)) && (isStringLike(b) || Array.isArray(b))) {
    const len = Math.max(a.length, b.length);

    let distance = 0;
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        distance++;
      }
    }
    return distance;
  }
  return countOnes((toNumber(a as NumberLike) | 0) ^ (toNumber(b as NumberLike) | 0));
}
