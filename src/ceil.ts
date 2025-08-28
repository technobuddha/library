import { constructNumber } from './construct-number.ts';
import { deconstructNumber } from './deconstruct-number.ts';

/**
 * Options for the {@link ceil} function
 * @group Math
 * @category Arithmetic
 */
export type CeilOptions = {
  /** A small value to subtract from the input before applying the ceiling, useful for floating-point tolerance. Defaults to 0. */
  tolerance?: number;
  /** The number of decimal places to consider when applying the ceiling. Defaults to 0. */
  precision?: number;
};

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
 * @category Arithmetic
 */
export function ceil(input: number, { tolerance = 0, precision = 0 }: CeilOptions = {}): number {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    return input;
  }

  let { sign, mantissa, exponent } = deconstructNumber(
    input - Math.sign(input) * tolerance - Number.EPSILON,
  );
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.ceil(constructNumber({ sign, mantissa, exponent })),
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
