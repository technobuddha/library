import { variance } from './variance.ts';

/**
 * Returns the sample [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the arguments.
 * @param dataPoints - samples to analyze.
 * @returns The sample standard deviation of the arguments (0 if fewer
 * than two samples were provided, or NaN if any of the samples is
 * not a valid number).
 * @example
 * ```typescript
 * standardDeviation(2, 4, 4, 4, 5, 5, 7, 9); // 2
 * standardDeviation(1, 1, 1, 1); // 0
 * standardDeviation(); // 0
 * standardDeviation(1, 2, NaN); // NaN
 * ```
 * @group Math
 * @category Statistics
 */
export function standardDeviation(...dataPoints: number[]): number {
  return Math.sqrt(variance(...dataPoints));
}
