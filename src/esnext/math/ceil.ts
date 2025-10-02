import { constructNumber } from '../construction/construct-number.ts';
import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type Precision, type Tolerance } from './options.ts';

/**
 * Returns the smallest integer greater than or equal to the given number, with optional tolerance and precision adjustments.
 * @param input - The number to apply the ceiling operation to.
 * @param options - Optional configuration object.
 * @returns The smallest integer greater than or equal to the adjusted input.
 * @example
 * ```typescript
 * ceil(2.3); // 3
 * ceil(-2.3); // -2
 * ceil(2.0001, { tolerance: 0.001 }); // 2
 * ceil(2.345, { precision: 2 }); // 2.35
 * ```
 * @group Math
 * @category Operations
 */
export function ceil(
  input: NumberLike,
  { tolerance = 0, precision = 0 }: Tolerance & Precision = {},
): number {
  const num = toNumber(input);

  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return num;
  }

  let { sign, mantissa, exponent } = deconstructNumber(
    num - Math.sign(num) * tolerance - Number.EPSILON,
    15,
  );
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.ceil(constructNumber({ sign, mantissa, exponent })),
    15,
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
