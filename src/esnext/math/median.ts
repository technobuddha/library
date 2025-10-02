import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { floor } from './floor.ts';
import { isEven } from './is-even.ts';

/**
 * Calculates the median value of an array of numbers.
 *
 * The median is the middle number in a sorted, ascending or descending, list of numbers.
 * If the list has an even number of elements, the median is the average of the two middle numbers.
 * @param numbers - An array of numbers to find the median of.
 * @returns The median value, or `NaN` if the input array is empty.
 * @example
 * ```typescript
 * median([1, 2, 3]); // 2
 * median([1, 2, 3, 4]); // 2.5
 * median([7, 1, 3, 5]); // 4
 * median([]); // NaN
 * ```
 * @group Math
 * @category Statistics
 */
export function median(numbers: NumberLike[]): number {
  if (numbers.length === 0) {
    return Number.NaN;
  }

  const sorted = numbers.map((n) => toNumber(n)).sort((a, b) => a - b);
  const mid = floor(sorted.length / 2);

  return isEven(sorted.length) ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
