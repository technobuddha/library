import { deconstructNumber } from '../deconstruct-number.ts';
import { empty } from '../unicode.ts';

import { illion } from './illion.ts';
import { makeOrdinal } from './make-ordinal.ts';
import { type Numbering } from './numbering.ts';

/**
 * Converts a numeric integer into its string representation.
 *
 * @param input - The numeric integer to be converted.
 * @param options - Configuration options for numbering.
 * @returns The string representation of the input number, formatted according to the provided options.
 * @internal
 */
export function fabricateNumericInteger(
  input: number,
  options: Pick<Numbering, 'ordinal' | 'precision' | 'shift'>,
): string {
  const { ordinal, precision, shift } = options;
  const words: string[] = [];

  let { mantissa, exponent } = deconstructNumber(input, precision);

  let first = true;
  while (exponent >= 0) {
    let quantity: number;

    ({ quantity, mantissa, exponent } = illion(mantissa, exponent, shift));

    if (first) {
      words.push(quantity.toString());
      first = false;
    } else {
      words.push(',', quantity.toString().padStart(3, '0'));
    }
  }

  if (ordinal && words.length > 0) {
    const last = words.length - 1;
    words[last] = makeOrdinal(words[last]);
  }

  return words.join(empty);
}
