import variance from './variance';

/**
 * Returns the sample standard deviation of the arguments.  For a definition of
 * sample standard deviation, see http://en.wikipedia.org/wiki/Standard_deviation
 *
 * @param datapoints samples to analyze.
 * @return The sample standard deviation of the arguments (0 if fewer
 * than two samples were provided, or NaN if any of the samples is
 * not a valid number).
 */
export function standardDeviation(...datapoints: number[]): number {
    return Math.sqrt(variance(...datapoints));
}

export default standardDeviation;
