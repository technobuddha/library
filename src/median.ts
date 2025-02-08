import { floor } from './floor.ts';
import { isEven } from './is-even.ts';

/**
 * Calculates the median value of an array of numbers.
 *
 * The median is the middle number in a sorted, ascending or descending, list of numbers.
 * If the list has an even number of elements, the median is the average of the two middle numbers.
 *
 * @param numbers - An array of numbers to find the median of.
 * @returns The median value, or `NaN` if the input array is empty.
 * @group Math
 * @category Statistics
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) {
    return Number.NaN;
  }

  const sorted = numbers.toSorted((a, b) => a - b);
  const mid = floor(sorted.length / 2);

  return isEven(sorted.length) ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
