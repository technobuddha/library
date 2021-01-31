import lodash_floor from 'lodash/floor';

type Options = {
    tolerance?: number;
    precision?: number;
};

/**
 * A tweaked variant of {@code Math.floor} which tolerates if the passed number
 * is infinitesimally smaller than the closest integer. It often happens with
 * the results of floating point calculations because of the finite precision
 * of the intermediate results. For example {@code Math.floor(Math.log(1000) /
 * Math.LN10) == 2}, not 3 as one would expect.
 * @param input A number.
 * @param precision The prevision to round down to.
 * @return The largest integer less than or equal to {@code num}.
 */
export function floor(input: number, { tolerance = 0, precision = 0 }: Options = {}): number {
    return lodash_floor(input + (Math.sign(input) * tolerance) + Number.EPSILON, precision);
}

export default floor;
