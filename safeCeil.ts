import ceil from 'lodash/ceil';

type Options = {
    precision?: number;
}

/**
  * A tweaked variant of {@code Math.ceil}. See {@code goog.math.safeFloor} for
  * details.
  * @param input        A number.
  * @param precision    The precision to round up to.
  * @return                The smallest integer greater than or equal to {@code input}.
  */
export function safeCeil(input: number, {precision = 0}: Options = {}): number {
    return ceil(input - Number.EPSILON, precision);
}

export default safeCeil;
