import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { type DeconstructedNumberBasic } from '../construction/deconstructed-number.ts';
import { fractionSlash } from '../unicode/unicode.ts';

import { deriveFraction } from './derive-fraction.ts';
import { type TextualizationOptions } from './textualization.ts';

/**
 * Options for fabricating a numeric fraction.
 *
 * This type combines configuration properties needed for numeric fraction formatting:
 * - `ordinal`: Whether to format as ordinal (though typically not used for fractions)
 * - `tolerance`: Maximum difference allowed when approximating fractions
 * - `precision`: Number of significant digits to maintain
 * - `denominators`: Which denominators to consider when finding fractional representations
 *
 * These options control how decimal values are converted to their closest fractional form
 * and how the resulting numerator and denominator are formatted.
 * @internal
 */
type FNFOptions = Pick<TextualizationOptions, 'ordinal'> & Parameters<typeof deriveFraction>[1];

/**
 * Converts a fractional value into its numeric representation using fraction slash notation.
 *
 * This function takes a `DeconstructedNumber` representing a fractional value and converts it
 * to a numeric fraction string using the fraction slash character (⁄), such as "1⁄2", "3⁄4",
 * or "2⁄3". The function uses `deriveFraction` to find the best fractional approximation
 * within a given tolerance from a set of allowed denominators.
 *
 * The output format is: `{numerator}⁄{denominator}`, where:
 * - The numerator is the simplified numerator value as digits
 * - The ⁄ symbol is the Unicode fraction slash (U+2044)
 * - The denominator is formatted with appropriate zero padding
 *
 * Special handling:
 * - Returns `null` if the numerator is zero (no fractional part to represent)
 * - Finds the closest matching fraction from allowed denominators
 * - Simplifies fractions when possible (e.g., 2⁄4 becomes 1⁄2)
 * - Formats denominators with trailing zeros when needed
 * @param input - The deconstructed fractional number to be converted. This should be the fractional
 *   part only (values between 0 and 1), typically obtained from `deconstructNumber(n).fractional`.
 *   The function uses both the `value` and the mantissa/exponent representation.
 * @param options - Configuration options controlling the fraction conversion:
 *   - `ordinal`: Whether to format as ordinal (not typically used for fractions)
 *   - `tolerance`: Maximum difference allowed when approximating fractions (e.g., 0.01 means
 *     the fraction can differ from the actual value by up to 1%)
 *   - `precision`: Number of significant digits to maintain (1-9)
 *   - `denominators`: Which denominators to consider:
 *     - `'common'`: Standard fractions (2, 3, 4, 5, 6, 8, 10, 12, 16, etc.)
 *     - `'wrench'`: Denominators used in wrench sizes (2, 4, 8, 16, 32, 64)
 *     - `number[]`: Custom array of allowed denominators
 * @returns The formatted numeric fraction string (e.g., "1⁄2", "3⁄4", "5⁄8"),
 *   or `null` if the numerator is zero (indicating no fractional part to represent).
 * @example
 * ```typescript
 * const options = \{
 *   ordinal: false,
 *   tolerance: 0.01,
 *   precision: 9,
 *   denominators: 'common'
 * \};
 *
 * // Common fractions
 * const half = deconstructNumber(0.5, 9);
 * fabricateNumericFraction(half.fractional, options);
 * // "1⁄2"
 *
 * const threeQuarters = deconstructNumber(0.75, 9);
 * fabricateNumericFraction(threeQuarters.fractional, options);
 * // "3⁄4"
 *
 * const twoThirds = deconstructNumber(0.666666, 9);
 * fabricateNumericFraction(twoThirds.fractional, options);
 * // "2⁄3"
 *
 * // Eighths
 * const fiveEighths = deconstructNumber(0.625, 9);
 * fabricateNumericFraction(fiveEighths.fractional, options);
 * // "5⁄8"
 *
 * // Zero returns null
 * const zero = deconstructNumber(0, 9);
 * fabricateNumericFraction(zero.fractional, options);
 * // null
 *
 * // Custom denominators
 * const customOptions = \{ ...options, denominators: [2, 4, 8] \};
 * const oneEighth = deconstructNumber(0.125, 9);
 * fabricateNumericFraction(oneEighth.fractional, customOptions);
 * // "1⁄8"
 * ```
 * @internal
 */
export function fabricateNumericFraction(
  input: DeconstructedNumberBasic,
  options: FNFOptions,
): string | null {
  const { numerator, denominator } = deriveFraction(input, options);

  if (numerator === 0) {
    return null;
  }

  const zero = '0';
  const { mantissa, exponent } = deconstructNumber(denominator, Infinity);
  const num = `${mantissa}${zero.repeat(exponent - mantissa.length + 1)}`;

  return `${numerator}${fractionSlash}${num}`;
}
