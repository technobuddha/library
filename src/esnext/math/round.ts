import { constructNumber } from '../construction/construct-number.ts';
import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type Precision } from './options.ts';

/**
 * Returns the nearest integer to the given number, with optional precision adjustments.
 * @param input - The number to round.
 * @param options - Optional configuration object.
 * @returns The nearest integer to the adjusted input.
 * @example
 * ```typescript
 * round(2.3); // 2
 * round(2.7); // 3
 * round(-2.5); // -2
 * round(2.345, { precision: 2 }); // 2.35
 * round(-2.345, { precision: 2 }); // -2.35
 * ```
 * @group Math
 * @category Operations
 */
export function round(input: NumberLike, { precision = 0 }: Precision = {}): number {
  const value = toNumber(input);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return value;
  }

  if (precision === 0) {
    return Math.round(value);
  }

  let { sign, mantissa, exponent } = deconstructNumber(value, 15);
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.round(constructNumber({ sign, mantissa, exponent })),
    15,
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
