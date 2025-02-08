import { cleanEnd } from '../clean-end.ts';
import { cardinalOnes, space } from '../constants.ts';
import { deconstructNumber } from '../deconstruct-number.ts';
import { splitChars } from '../split-chars.ts';

import { fraction } from './fraction.ts';
import { hundreds } from './hundreds.ts';
import { illion } from './illion.ts';
import { makeOrdinal } from './make-ordinal.ts';
import { type Numbering } from './numbering.ts';

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
