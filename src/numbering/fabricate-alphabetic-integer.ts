import { cleanEnd } from '../clean-end.ts';
import { cardinalOnes } from '../constants.ts';
import { deconstructNumber } from '../deconstruct-number.ts';
import { splitChars } from '../split-chars.ts';
import { space } from '../unicode.ts';

import { fraction } from './fraction.ts';
import { hundreds } from './hundreds.ts';
import { illion } from './illion.ts';
import { makeOrdinal } from './make-ordinal.ts';
import { type Numbering } from './numbering.ts';

/**
 * Converts a numeric input into its alphabetic (word-based) representation according to the specified numbering options.
 *
 * This function decomposes the input number into its constituent parts and constructs a string representation
 * using alphabetic words, optionally handling ordinals, fractions, and different output formats (hybrid, numeric, alphabetic).
 *
 * @param input - The numeric value to be converted into an alphabetic string.
 * @param options - An object specifying formatting options:
 *   - `output`: Determines the output style (e.g., 'hybrid', 'alphabetic', 'numeric').
 *   - `precision`: The number of decimal places to consider.
 *   - `ordinal`: Whether to output the ordinal form (e.g., "first", "second").
 *   - `shift`: Specifies the numeric shift (e.g., 'decimal').
 *
 * @returns The alphabetic string representation of the input number, formatted according to the provided options.
 * @internal
 */
export function fabricateAlphabeticInteger(input: number, options: Numbering): string {
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
