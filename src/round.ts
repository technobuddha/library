import { constructNumber } from './construct-number.ts';
import { deconstructNumber } from './deconstruct-number.ts';

/**
 * Options for the {@link round} function
 * @group Math
 * @category Operations
 */
export type RoundOptions = {
  /** The number of decimal places to consider when applying the ceiling. Defaults to 0. */
  precision?: number;
};

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
export function round(input: number, { precision = 0 }: RoundOptions = {}): number {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    return input;
  }

  let { sign, mantissa, exponent } = deconstructNumber(input);
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.round(constructNumber({ sign, mantissa, exponent })),
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
