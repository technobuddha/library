import mean from 'lodash/mean';
import sum from 'lodash/sum';

/**
 * Returns the unbiased sample variance of the arguments. For a definition,
 * see http://en.wikipedia.org/wiki/Variance
 *
 * @param datapoints Number samples to analyze.
 * @return The unbiased sample variance of the arguments (0 if fewer
 * than two samples were provided, or {@code NaN} if any of the samples is
 * not a valid number).
 */
export function variance(...datapoints: number[]): number {
    const sampleSize = datapoints.length;
    if(sampleSize < 2)
        return NaN;

    const average  = mean(datapoints);
    return sum(datapoints.map(val => Math.pow(val - average, 2))) / (sampleSize - 1);
}

export default variance;
