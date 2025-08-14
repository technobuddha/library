import { empty, negativeSign, space } from '../constants.ts';
import { deconstructNumber } from '../deconstruct-number.ts';

import { fabricateAlphabeticFraction } from './fabricate-alphabetic-fraction.ts';
import { fabricateAlphabeticInteger } from './fabricate-alphabetic-integer.ts';
import { fabricateNumericFraction } from './fabricate-numeric-fraction.ts';
import { fabricateNumericInteger } from './fabricate-numeric-integer.ts';
import { makeOrdinal } from './make-ordinal.ts';

export type Numbering = {
  output: {
    integer: 'numeric' | 'alphabetic' | 'hybrid';
    fraction: 'numeric' | 'alphabetic';
  };

  /** Word to place after the hundreds.  "one hundred and one" vs. "one hundred one" */
  and: string;
  /** Character to place between the tens units and the ones units.  "twenty-one" vs. "twenty one" */
  hyphen: string;

  tolerance: number;
  denominators: 'common' | 'wrench' | number[];
  precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  ordinal?: boolean;
};

export function signWord(sign: 1 | -1): string {
  return sign === 1 ? empty : 'negative ';
}

export function signSymbol(sign: 1 | -1): string {
  return sign === 1 ? empty : negativeSign;
}

export function numbering(input: number, options: Numbering): string {
  const { output, precision, ordinal } = options;

  if (Number.isNaN(input)) {
    return (
      ordinal ? 'nth'
      : output.integer === 'numeric' ? 'NaN'
      : 'not a number'
    );
  }

  if (!Number.isFinite(input)) {
    return (
      ordinal ? 'nth'
      : output.integer === 'numeric' ?
        input < 0 ?
          `${negativeSign}∞`
        : '∞'
      : input < 0 ? 'negative infinity'
      : 'infinity'
    );
  }

  const { sign, whole, fraction } = deconstructNumber(input, precision);
  const s = output.integer === 'numeric' ? signSymbol(sign) : signWord(sign);

  if (whole.value === 0 && fraction.value === 0) {
    const words = output.integer === 'alphabetic' ? `${s}zero` : `${s}0`;
    return ordinal ? makeOrdinal(words) : words;
  }

  const fractionalPart =
    output.fraction === 'numeric' ?
      fabricateNumericFraction(fraction, options)
    : fabricateAlphabeticFraction(fraction, options);

  if (whole.value === 0) {
    if (ordinal) {
      const word = output.integer === 'alphabetic' ? 'zeroth' : '0th';
      return `${word} and ${fractionalPart}`;
    }

    return `${s}${fractionalPart}`;
  }

  const integerPart =
    output.integer === 'alphabetic' || output.integer === 'hybrid' ?
      fabricateAlphabeticInteger(whole.value, options)
    : fabricateNumericInteger(whole.value, options);

  if (fraction.value === 0) {
    return `${s}${integerPart}`;
  }

  const join =
    (
      ((output.integer === 'alphabetic' || output.integer === 'hybrid') &&
        output.fraction === 'alphabetic') ||
      ordinal
    ) ?
      ' and '
    : space;

  return `${s}${integerPart}${join}${fractionalPart}`.trim();
}
