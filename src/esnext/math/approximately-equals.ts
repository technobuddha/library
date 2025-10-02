import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type Tolerance } from './options.ts';

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance, taking into account floating point errors (numbers within EPSILON).
 * @param a - First number to compare.
 * @param b - Second number to compare.
 * @param options - see {@link Tolerance}
 * @defaultValue tolerance 0
 * @returns true if *a* and *b* are nearly equal.
 * @example
 * ```typescript
 * approximatelyEquals(0.1 + 0.2, 0.3); // true (floating point rounding)
 * approximatelyEquals(100, 100.0000001); // true
 * approximatelyEquals(100, 100.1); // false
 * approximatelyEquals(5, 7, { tolerance: 2 }); // true
 * approximatelyEquals(5, 8, { tolerance: 2 }); // false
 * ```
 * @group Math
 * @category Comparison
 */
export function approximatelyEquals(
  a: NumberLike,
  b: NumberLike,
  { tolerance = 0 }: Tolerance = {},
): boolean {
  return Math.abs(toNumber(a) - toNumber(b)) <= tolerance + Number.EPSILON;
}
