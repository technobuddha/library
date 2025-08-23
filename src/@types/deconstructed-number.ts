/**
 * Represents a number that has been deconstructed into its mathematical components.
 *
 * @group Math
 * @category Numbers
 */
export type DeconstructedNumber = {
  /** The original numeric value, rounded to the specified precision */
  value: number;
  /** The sign of the number, where 1 indicates positive and -1 indicates negative. */
  sign: 1 | -1;
  /** The mantissa (or significand) part of the number, represented as a string. */
  mantissa: string;
  /** The exponent part of the number, indicating the power of 10 by which the mantissa is multiplied. */
  exponent: number;
};
