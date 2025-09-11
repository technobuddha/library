import { constructNumber } from './construct-number.ts';
import { deconstructNumber } from './deconstruct-number.ts';

/**
 * Options for the {@link floor} function
 * @group Math
 * @category Operations
 */
export type FloorOptions = {
  /** A small value to add to the input before applying the floor, useful for floating-point tolerance. Defaults to 0. */
  tolerance?: number;
  /** The number of decimal places to consider when applying the ceiling. Defaults to 0. */
  precision?: number;
};

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
export function floor(input: number, { tolerance = 0, precision = 0 }: FloorOptions = {}): number {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    return input;
  }

  let { sign, mantissa, exponent } = deconstructNumber(
    input + Math.sign(input) * tolerance + Number.EPSILON,
  );
  exponent += precision;
  ({ sign, mantissa, exponent } = deconstructNumber(
    Math.floor(constructNumber({ sign, mantissa, exponent })),
  ));
  exponent -= precision;

  return constructNumber({ sign, mantissa, exponent });
}
