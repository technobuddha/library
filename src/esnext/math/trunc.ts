import { constructNumber } from '../construction/construct-number.ts';
import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type Precision, type Tolerance } from './options.ts';

/**
 * Truncates a number towards zero, removing any fractional digits.
 *
 * Equivalent to `Math.trunc`, but works for all finite numbers.
 *
 * @param value - The number to truncate.
 * @returns The truncated integer value.
 *
 * @example
 * ```ts
 * trunc(3.9); // 3
 * trunc(-2.7); // -2
 * trunc(0); // 0
 * trunc(-0); // -0
 * ```
 *
 * @group Math
 * @category Number
 */
export function trunc(
  value: NumberLike,
  { tolerance = 0, precision = 0 }: Tolerance & Precision = {},
): number {
  const input = toNumber(value);

  if (Number.isNaN(input) || !Number.isFinite(input)) {
    return input;
  }

  let { sign, mantissa, exponent } = deconstructNumber(input + Math.sign(input) * tolerance, 15);
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.trunc(constructNumber({ sign, mantissa, exponent })),
    15,
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
