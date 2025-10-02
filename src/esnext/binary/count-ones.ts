/**
 * Counts the number of 1 bits (set bits) in the binary representation of a number or bigint.
 *
 * This function works for both JavaScript `number` and `bigint` types. For negative numbers,
 * the result reflects the two's complement representation.
 *
 * @param n - The number or bigint to count 1 bits in.
 * @returns The number of 1 bits in the binary representation of `n`.
 *
 * @example
 * ```ts
 * import { countOnes } from "@technobuddha/library";
 *
 * countOnes(0b1011); // 3
 * countOnes(255); // 8
 * countOnes(0n); // 0
 * countOnes(1023n); // 10
 * ```
 *
 * @group Binary
 * @category Analysis
 */
export function countOnes(n: number | bigint): number {
  let count = 0;
  let value = n;

  if (typeof value === 'number') {
    value |= 0;
    while (value) {
      count += value & 1;
      value >>>= 1;
    }
  } else {
    if (value < 0n) {
      return Infinity;
    }
    while (value) {
      count += Number(value & 1n);
      value >>= 1n;
    }
  }

  return count;
}
