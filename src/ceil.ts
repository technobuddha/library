import { deconstructNumber, reconstructNumber } from './deconstruct-number.ts';

/**
 * Options for the {@link ceil} function
 *
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
 *
 * @param input - The number to apply the ceiling operation to.
 * @param options - Optional configuration object.
 * @returns The smallest integer greater than or equal to the adjusted input.
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
    Math.ceil(reconstructNumber({ sign, mantissa, exponent })),
  ));
  exponent -= precision;

  return reconstructNumber({ sign, mantissa, exponent });
}
