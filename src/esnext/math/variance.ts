import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { mean } from './mean.ts';
import { sum } from './sum.ts';

/**
 * Returns the unbiased sample [Variance](https://en.wikipedia.org/wiki/Variance) of the arguments.
 * @param dataPoints - Number samples to analyze.
 * @returns The unbiased sample variance of the arguments (0 if fewer
 * than two samples were provided, or `NaN` if any of the samples is
 * not a valid number).
 * @example
 * ```typescript
 * variance(2, 4, 4, 4, 5, 5, 7, 9); // 4
 * variance(1, 1, 1, 1); // 0
 * variance(); // NaN
 * variance(1, 2, NaN); // NaN
 * ```
 * @group Math
 * @category Statistics
 */
export function variance(...dataPoints: NumberLike[]): number {
  const sampleSize = dataPoints.length;
  if (sampleSize < 2) {
    return NaN;
  }

  const average = mean(dataPoints);
  return sum(dataPoints.map((val) => (toNumber(val) - average) ** 2)) / (sampleSize - 1);
}
