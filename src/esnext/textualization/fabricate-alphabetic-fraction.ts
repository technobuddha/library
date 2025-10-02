import { type DeconstructedNumberBasic } from '../construction/deconstructed-number.ts';
import { plural } from '../english/plural.ts';
import { empty, hyphen, space } from '../unicode/unicode.ts';

import { deriveFraction } from './derive-fraction.ts';
import { fabricateAlphabeticInteger } from './fabricate-alphabetic-integer.ts';
import { ordinal } from './ordinal.ts';
import { type TextualizationOptions } from './textualization.ts';

/**
 * Returns the English word representation of a fractional denominator.
 *
 * This helper function converts a numeric denominator into its corresponding English word form,
 * using special terms for common fractions (half, quarter) and ordinal numbers for others
 * (third, fourth, fifth, etc.).
 *
 * Special cases:
 * - Returns "half" for denominator 2
 * - Returns "quarter" for denominator 4
 * - For other denominators, returns the alphabetic ordinal form (e.g., "third", "fifth", "eighth")
 * - Removes a leading "one " prefix if present in the ordinal form
 * @param denominator - The denominator of the fraction (must be a positive integer ≥ 2).
 *   Common values include 2, 3, 4, 5, 6, 8, 10, 12, 16, etc.
 * @returns The word representation of the fractional denominator (e.g., "half", "quarter", "third", "fifth").
 * @example
 * ```typescript
 * fractionWord(2);  // "half"
 * fractionWord(4);  // "quarter"
 * fractionWord(3);  // "third"
 * fractionWord(5);  // "fifth"
 * fractionWord(8);  // "eighth"
 * fractionWord(10); // "tenth"
 * ```
 * @internal
 */
function fractionWord(denominator: number): string {
  if (denominator === 2) {
    return 'half';
  }
  if (denominator === 4) {
    return 'quarter';
  }

  const words = ordinal(denominator, { output: 'alphabetic' });
  return words.startsWith('one ') ? words.slice(4) : words;
}

/**
 * Converts a fractional value into its alphabetic (word-based) representation.
 *
 * This function takes a `DeconstructedNumber` representing a fractional value and converts it
 * to an English phrase like "three-fourths", "one-half", or "two-thirds". It uses the
 * `deriveFraction` function to find the best fractional representation within a given tolerance,
 * then converts both the numerator and denominator to words.
 *
 * The output format is: `{numerator}-{fraction_word}`, where:
 * - The numerator is converted to alphabetic form ("one", "two", "three", etc.)
 * - The fraction word is pluralized based on the numerator ("half" vs "halves", "third" vs "thirds")
 *
 * Special handling:
 * - Returns `null` if the numerator is zero (no fractional part)
 * - Uses special terms: "half" (not "second"), "quarter" (not "fourth")
 * - Properly pluralizes fraction words ("third" → "thirds", "half" → "halves")
 * @param input - The deconstructed fractional number to be converted. This should be the fractional
 *   part only (values between 0 and 1), typically obtained from `deconstructNumber(n).fractional`.
 * @param options - Configuration options controlling the fraction conversion:
 *   - `tolerance`: Maximum difference allowed when approximating fractions (e.g., 0.01)
 *   - `precision`: Number of significant digits to maintain (1-9)
 *   - `denominators`: Which denominators to consider ('common', 'wrench', or custom array)
 *   - `output`: Output format options (affects numerator rendering)
 *   - `and`, `hyphen`: Text formatting options
 * @returns The alphabetic fraction as a string (e.g., "three-fourths", "one-half"),
 *   or `null` if the numerator is zero (indicating no fractional part to represent).
 * @example
 * ```typescript
 * const options = \{
 *   output: \{ integer: 'alphabetic', fraction: 'alphabetic' \},
 *   and: '',
 *   hyphen: ' ',
 *   tolerance: 0.01,
 *   denominators: 'common',
 *   precision: 9,
 *   ordinal: false,
 *   shift: false
 * \};
 *
 * // Common fractions
 * const half = deconstructNumber(0.5, 9);
 * fabricateAlphabeticFraction(half.fractional, options);
 * // "one-half"
 *
 * const threeQuarters = deconstructNumber(0.75, 9);
 * fabricateAlphabeticFraction(threeQuarters.fractional, options);
 * // "three-quarters"
 *
 * const twoThirds = deconstructNumber(0.666666, 9);
 * fabricateAlphabeticFraction(twoThirds.fractional, options);
 * // "two-thirds"
 *
 * // Zero returns null
 * const zero = deconstructNumber(0, 9);
 * fabricateAlphabeticFraction(zero.fractional, options);
 * // null
 * ```
 * @internal
 */
export function fabricateAlphabeticFraction(
  input: DeconstructedNumberBasic,
  options: TextualizationOptions,
): string | null {
  const { numerator, denominator } = deriveFraction(input, options);

  if (numerator === 0) {
    return null;
  }

  const fractionPart = plural(fractionWord(denominator), numerator);

  const integerPart = fabricateAlphabeticInteger(numerator, {
    output: {
      integer: 'alphabetic',
      fraction: 'alphabetic',
    },
    and: empty,
    hyphen: space,
    tolerance: 0.01,
    denominators: 'common',
    precision: 9,
    ordinal: false,
    shift: false,
  });

  return `${integerPart}${hyphen}${fractionPart}`;
}
