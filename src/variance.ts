import { mean, sum } from 'lodash-es';

/**
 * Returns the unbiased sample [Variance](https://en.wikipedia.org/wiki/Variance) of the arguments.
 *
 * @param datapoints - Number samples to analyze.
 * @returns The unbiased sample variance of the arguments (0 if fewer
 * than two samples were provided, or @see NaN if any of the samples is
 * not a valid number).
 * @group Math
 * @category Statistics
 */
export function variance(...datapoints: number[]): number {
  const sampleSize = datapoints.length;
  if (sampleSize < 2) {
    return Number.NaN;
  }

  const average = mean(datapoints);
  return sum(datapoints.map((val) => (val - average) ** 2)) / (sampleSize - 1);
}
