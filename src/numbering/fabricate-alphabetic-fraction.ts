import { type DeconstructedNumber } from '../@types/deconstructed-number.ts';
import { plural } from '../plural.ts';
import { empty, hyphen, space } from '../unicode.ts';

import { deriveFraction } from './derive-fraction.ts';
import { fabricateAlphabeticInteger } from './fabricate-alphabetic-integer.ts';
import { type Numbering } from './numbering.ts';
import { ordinal } from '../ordinal.ts';

/**
 * Returns the English word representation of a fractional denominator.
 *
 * Special cases:
 * - Returns "half" for denominator 2.
 * - Returns "quarter" for denominator 4.
 * - For other denominators, returns the alphabetic ordinal form, removing a leading "one " if present.
 * @param denominator - The denominator of the fraction.
 * @returns The word representation of the fractional denominator.
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
 * Converts a given number, represented as a `DeconstructedNumber`, into its alphabetic fraction form.
 * The output is a string representing the number as an alphabetic integer and fraction (e.g., "three-fourths"),
 * or `null` if the numerator is zero.
 * @param input - The deconstructed number to be converted into an alphabetic fraction.
 * @param options - Numbering options that influence the formatting and construction of the output.
 * @returns The alphabetic fraction as a string, or `null` if the numerator is zero.
 * @internal
 */
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
