import { type DeconstructedNumber } from '../@types/deconstructed-number.ts';
import { empty, hyphen, space } from '../constants.ts';
import { plural } from '../plural.ts';

import { deriveFraction } from './derive-fraction.ts';
import { fabricateAlphabeticInteger } from './fabricate-alphabetic-integer.ts';
import { type Numbering } from './numbering.ts';
import { ordinal } from './ordinal.ts';

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

export function fabricateAlphabeticFraction(
  input: DeconstructedNumber,
  options: Numbering,
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
