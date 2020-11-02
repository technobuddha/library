import variance                    from './variance';

//#region standardDeviation
/**
  * Returns the sample standard deviation of the arguments.  For a definition of
  * sample standard deviation, see e.g.
  * http://en.wikipedia.org/wiki/Standard_deviation
  * @param {...number} var_args Number samples to analyze.
  * @return {number} The sample standard deviation of the arguments (0 if fewer
  *     than two samples were provided, or {@code NaN} if any of the samples is
  *     not a valid number).
  */
export function standardDeviation(...datapoints: number[]): number {
    return Math.sqrt(variance(...datapoints));
}

export default standardDeviation;

