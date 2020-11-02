import floor from 'lodash/floor';

type Options = {
    precision?: number;
}

/**
  * A tweaked variant of {@code Math.floor} which tolerates if the passed number
  * is infinitesimally smaller than the closest integer. It often happens with
  * the results of floating point calculations because of the finite precision
  * of the intermediate results. For example {@code Math.floor(Math.log(1000) /
  * Math.LN10) == 2}, not 3 as one would expect.
  * @param input        A number.
  * @param precision    The prevision to round down to.
  * @return            The largest integer less than or equal to {@code num}.
  */
export function safeFloor(input: number, {precision = 0}: Options = {}): number {
    return floor(input + Number.EPSILON, precision);
}

export default safeFloor;
