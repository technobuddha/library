import { variance } from './variance.ts';

/**
 * Returns the sample [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the arguments.
 *
 * @param datapoints - samples to analyze.
 * @returns The sample standard deviation of the arguments (0 if fewer
 * than two samples were provided, or NaN if any of the samples is
 * not a valid number).
 * @group Math
 * @category Statistics
 */
export function standardDeviation(...datapoints: number[]): number {
  return Math.sqrt(variance(...datapoints));
}
