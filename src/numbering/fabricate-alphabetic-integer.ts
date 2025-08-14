import { space } from '../constants.ts';
import { deconstructNumber } from '../deconstruct-number.ts';

import { hundreds } from './hundreds.ts';
import { illion } from './illion.ts';
import { makeOrdinal } from './make-ordinal.ts';
import { type Numbering } from './numbering.ts';

export function fabricateAlphabeticInteger(input: number, options: Numbering): string {
  const { output, precision, ordinal } = options;

  const words: string[] = [];

  let { mantissa, exponent } = deconstructNumber(input, precision);

  while (Number.parseInt(mantissa) > 0 && exponent >= 0) {
    let word: string | null;
    let quantity: number;

    ({ quantity, mantissa, exponent, word } = illion(mantissa, exponent));

    if (quantity) {
      if (output.integer === 'hybrid') {
        words.push(quantity.toString());
      } else {
        const { whole /*, fraction*/ } = deconstructNumber(quantity, Infinity);

        words.push(...hundreds(whole.value, options));
        // if (fraction.value > 0) {
        //   words.push('point');
        //   const frac = splitChars(cleanEnd(fraction.value.toFixed(2).slice(2), '0'));
        //   for (const digit of frac) {
        //     words.push(cardinalOnes[Number.parseInt(digit)]);
        //   }
        // }
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
