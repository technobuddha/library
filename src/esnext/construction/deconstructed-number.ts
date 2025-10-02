/**
 * Basic components of a deconstructed number in scientific notation.
 *
 * This type represents a number broken down into its mathematical components following
 * the format: sign × mantissa × 10^exponent. For example, the number -123.45 would be
 * represented as: -1 × 12345 × 10^-2.
 *
 * @internal
 */
export type DeconstructedNumberBasic = {
  /** The absolute value of the number, normalized to the specified precision. */
  value: number;

  /** The sign of the number: 1 for positive (including +0), -1 for negative (including -0). */
  sign: 1 | -1;

  /**
   * The mantissa (significand) part of the number as a string, with decimal point removed.
   * For example, 1.234 becomes "1234". Empty string represents zero.
   */
  mantissa: string;

  /**
   * The exponent indicating the power of 10 by which the mantissa should be multiplied.
   * Represents the position of the decimal point relative to the first digit of the mantissa.
   */
  exponent: number;
};

/**
 * Represents a number that has been deconstructed into its mathematical components.
 *
 * This type provides a complete breakdown of a number into its sign, mantissa, and exponent,
 * along with separate representations of its whole (integer) and fractional (decimal) parts.
 * Each component follows scientific notation: sign × mantissa × 10^exponent.
 *
 * The type is useful for precise mathematical operations, number formatting, and analysis
 * where understanding the internal structure of a floating-point number is important.
 *
 * @example
 * A typical deconstructed number for 123.456:
 * ```ts
 * const result = deconstructNumber(123.456);
 * // \{
 * //   value: 123.456,
 * //   sign: 1,
 * //   mantissa: "123456",
 * //   exponent: 2,
 * //   whole: \{
 * //     value: 123,
 * //     sign: 1,
 * //     mantissa: "123",
 * //     exponent: 2
 * //   \},
 * //   fractional: \{
 * //     value: 0.456,
 * //     sign: 1,
 * //     mantissa: "456",
 * //     exponent: -1
 * //   \}
 * // \}
 * ```
 *
 * @example
 * A deconstructed negative number -42.75:
 * ```ts
 * const result = deconstructNumber(-42.75);
 * // \{
 * //   value: 42.75,
 * //   sign: -1,
 * //   mantissa: "4275",
 * //   exponent: 1,
 * //   whole: \{ value: 42, sign: -1, mantissa: "42", exponent: 1 \},
 * //   fractional: \{ value: 0.75, sign: -1, mantissa: "75", exponent: -1 \}
 * // \}
 * ```
 *
 * @see {@link deconstructNumber} for creating deconstructed numbers
 * @see {@link constructNumber} for reconstructing numbers from their components
 *
 * @group Construction
 * @category Types
 */
export type DeconstructedNumber = DeconstructedNumberBasic & {
  /**
   * The fractional (decimal) part of the number, deconstructed into its own components.
   * For whole numbers, this will have a value of 0 with an empty mantissa.
   */
  fractional: DeconstructedNumberBasic;

  /**
   * The whole (integer) part of the number, deconstructed into its own components.
   * For numbers between -1 and 1 (excluding -1 and 1), this will have a value of 0
   * with an empty mantissa.
   */
  whole: DeconstructedNumberBasic;
};
