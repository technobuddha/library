import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { cleanEnd } from '../string/clean-end.ts';
import { splitChars } from '../tokenization/split-chars.ts';
import { space } from '../unicode/unicode.ts';

import { cardinalOnes } from './constants.ts';
import { fraction } from './fraction.ts';
import { hundreds } from './hundreds.ts';
import { illion } from './illion.ts';
import { makeOrdinal } from './make-ordinal.ts';
import { type TextualizationOptions } from './textualization.ts';

/**
 * Converts a numeric input into its alphabetic (word-based) representation.
 *
 * This function transforms numbers into their English word equivalents (e.g., 42 → "forty-two",
 * 1234 → "one thousand two hundred thirty-four"). It handles various scales from ones to
 * very large numbers (millions, billions, trillions, and beyond), with support for ordinal forms,
 * hybrid output (mixing digits and words), and decimal representations.
 *
 * The function processes numbers by breaking them into groups using Latin-based "illion" naming
 * conventions (thousand, million, billion, trillion, etc.) and converts each group to words using
 * the `hundreds` helper function.
 * @param input - The numeric value to be converted into an alphabetic string. Can be any finite number,
 *   including integers and decimals. The function processes the absolute value (sign is handled elsewhere).
 * @param options - Configuration options controlling the output format:
 *   - `output.integer`: Output style for the integer part
 *     - `'alphabetic'`: Full word form (e.g., "forty-two")
 *     - `'hybrid'`: Uses digits for whole numbers with words for fractions
 *     - `'numeric'`: Should not be used with this function (use `fabricateNumericInteger` instead)
 *   - `output.fraction`: Output style for fractional parts ('alphabetic' or 'numeric')
 *   - `precision`: Number of significant digits (1-9) to maintain during conversion
 *   - `ordinal`: When `true`, converts the last word to ordinal form (e.g., "first", "twenty-first")
 *   - `shift`: Controls decimal handling
 *     - `'decimal'`: Converts decimals to "point" notation (e.g., 3.14 → "three point one four")
 *     - `false`: Handles decimals as fractions
 *   - `and`: Text to insert after hundreds (typically " and " or empty string)
 *   - `hyphen`: Character(s) to use between tens and ones (typically "-" or " ")
 * @returns The alphabetic string representation of the input number. Returns an empty string for zero
 *   when used as part of a larger number (the calling function handles zero specially).
 *   For non-zero values, returns words like "one", "forty-two", "one thousand", etc.
 * @example
 * ```typescript
 * const options = \{
 *   output: \{ integer: 'alphabetic', fraction: 'alphabetic' \},
 *   and: '',
 *   hyphen: '-',
 *   precision: 9,
 *   ordinal: false,
 *   shift: false,
 *   tolerance: 0.01,
 *   denominators: 'common'
 * \};
 *
 * // Basic integers
 * fabricateAlphabeticInteger(42, options);
 * // "forty-two"
 *
 * fabricateAlphabeticInteger(1234, options);
 * // "one thousand two hundred thirty-four"
 *
 * // Large numbers
 * fabricateAlphabeticInteger(1000000, options);
 * // "one million"
 *
 * // With ordinal
 * fabricateAlphabeticInteger(21, \{ ...options, ordinal: true \});
 * // "twenty-first"
 *
 * // With decimal shift
 * fabricateAlphabeticInteger(3.14, \{ ...options, shift: 'decimal' \});
 * // "three point one four"
 *
 * // With "and"
 * fabricateAlphabeticInteger(101, \{ ...options, and: ' and ' \});
 * // "one hundred and one"
 * ```
 * @internal
 */
export function fabricateAlphabeticInteger(input: number, options: TextualizationOptions): string {
  const { output, precision, ordinal, shift } = options;

  const words: string[] = [];

  let { mantissa, exponent } = deconstructNumber(input, precision);

  while (Number.parseInt(mantissa) > 0 && exponent >= 0) {
    let word: string | null;
    let quantity: number;

    ({ quantity, mantissa, exponent, word } = illion(mantissa, exponent, shift));
    const { whole, fractional } = deconstructNumber(quantity, Infinity);

    if (quantity) {
      if (output.integer === 'hybrid') {
        if (fractional.value > 0) {
          if (shift === 'decimal') {
            words.push(quantity.toString());
          } else {
            words.push(fraction(quantity, { output: 'numeric' }));
          }
        } else {
          words.push(quantity.toString());
        }
      } else if (fractional.value > 0) {
        if (shift === 'decimal') {
          words.push(...hundreds(whole.value, options), 'point');
          const frac = splitChars(cleanEnd(fractional.value.toFixed(2).slice(2), '0'));
          for (const digit of frac) {
            words.push(cardinalOnes[Number.parseInt(digit)]);
          }
        } else {
          words.push(fraction(quantity, { output: 'alphabetic' }));
        }
      } else {
        words.push(...hundreds(whole.value, options));
      }
      if (word) {
        words.push(word);
      }
    }
  }

  if (ordinal && words.length > 0) {
    const last = words.length - 1;
    words[last] = makeOrdinal(words[last]);
  }

  return words.join(space);
}
