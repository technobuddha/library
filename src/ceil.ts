import { ceil as lodash_ceil } from 'lodash-es';

/**
 * @group Math
 * @category Ceiling / Floor
 */
export type CeilOptions = {
  tolerance?: number;
  precision?: number;
};

/**
 * A tweaked variant of @see Math.ceil. See @see goog.math.safeFloor for
 * details.
 * @param input - A number.
 * @param precision - The precision to round up to.
 * @returns The smallest integer greater than or equal to @see input.
 * @group Math
 * @category Ceiling / Floor
 */
export function ceil(input: number, { tolerance = 0, precision = 0 }: CeilOptions = {}): number {
  return lodash_ceil(input - Math.sign(input) * tolerance - Number.EPSILON, precision);
}
