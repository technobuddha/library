import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Calculates the sum of a sequence of values that can be converted to numbers.
 *
 * Accepts any {@link NumberLike} (e.g., number, string, bigint, etc.) and returns their total as a number.
 *
 * @param numbers - An iterable of values convertible to numbers (see {@link NumberLike}).
 * @returns The total sum of all values in the iterable as a number.
 *
 * @example
 * ```typescript
 * sum([1, 2, 3, 4]); // 10
 * sum([-1, 1, -1, 1]); // 0
 * sum([]); // 0
 * sum([2.5, 3.5]); // 6
 * sum(["1", 2, 3n]); // 6
 * ```
 *
 * @group Math
 * @category Statistics
 */
export function sum(numbers: Iterable<NumberLike>): number {
  let sum = 0;
  for (const num of numbers) {
    sum += toNumber(num);
  }
  return sum;
}
