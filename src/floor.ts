import { floor as lodash_floor } from 'lodash-es';

export type FloorOptions = {
  tolerance?: number;
  precision?: number;
};

/**
 * A tweaked variant of @see Math.floor which tolerates if the passed number
 * is infinitesimally smaller than the closest integer. It often happens with
 * the results of floating point calculations because of the finite precision
 * of the intermediate results. For example @see Math.floor(Math.log(1000) /
 * Math.LN10) == 2, not 3 as one would expect.
 * @param input - A number.
 * @param precision - The prevision to round down to.
 * @returns The largest integer less than or equal to @see num.
 */
export function floor(input: number, { tolerance = 0, precision = 0 }: FloorOptions = {}): number {
  return lodash_floor(input + Math.sign(input) * tolerance + Number.EPSILON, precision);
}
