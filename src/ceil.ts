import lodash_ceil from 'lodash/ceil';

type Options = {
    tolerance?: number;
    precision?: number;
};

/**
 * A tweaked variant of {@code Math.ceil}. See {@code goog.math.safeFloor} for
 * details.
 * @param input        A number.
 * @param precision    The precision to round up to.
 * @return                The smallest integer greater than or equal to {@code input}.
 */
export function ceil(input: number, { tolerance = 0, precision = 0 }: Options = {}): number {
    return lodash_ceil(input - (Math.sign(input) * tolerance) - Number.EPSILON, precision);
}

export default ceil;
