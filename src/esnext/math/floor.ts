import { constructNumber } from '../construction/construct-number.ts';
import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type Precision, type Tolerance } from './options.ts';

/**
 * Returns the largest integer less than or equal to the given number, with optional tolerance and precision adjustments.
 * @param input - The number to floor.
 * @param options - Optional settings for the operation.
 * @returns The floored number, adjusted for tolerance and precision.
 * @example
 * ```typescript
 * floor(2.7); // 2
 * floor(-2.7); // -3
 * floor(2.999, { tolerance: 0.001 }); // 2
 * floor(2.345, { precision: 2 }); // 2.34
 * ```
 * @group Math
 * @category Operations
 */
export function floor(
  input: NumberLike,
  { tolerance = 0, precision = 0 }: Tolerance & Precision = {},
): number {
  const value = toNumber(input);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return value;
  }

  if (precision === 0) {
    return Math.floor(value + Math.sign(value) * tolerance + Number.EPSILON);
  }

  let { sign, mantissa, exponent } = deconstructNumber(
    value + Math.sign(value) * tolerance + Number.EPSILON,
    15,
  );
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.floor(constructNumber({ sign, mantissa, exponent })),
    15,
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
