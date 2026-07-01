import { type NumberLike } from '../number/number-like.ts';

import { sum } from './sum.ts';

/**
 * Calculates the Operations mean (average) of an array of numbers.
 * @param numbers - An array of numbers to calculate the mean of.
 * @returns The mean of the numbers, or `NaN` if the array is empty.
 * @group Math
 * @category Statistics
 */
export function mean(numbers: NumberLike[]): number {
  if (numbers.length > 0) {
    return sum(numbers) / numbers.length;
  }
  return NaN;
}
