import { isFinite, isInteger, isNaN } from 'lodash-es';

import { cardinal, type CardinalOptions } from './cardinal.ts';
import { tens } from './constants.ts';

// prettier-ignore
const ordinalOnes = [ '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
  'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth',
  'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'
];
const ordinalTens = [
  'twentieth',
  'thirtieth',
  'fortieth',
  'fiftieth',
  'sixtieth',
  'seventieth',
  'eightieth',
  'ninetieth',
];

type OrdinalOptionsAlphabetic = {
  output?: 'alphabetic';
} & CardinalOptions;

type OrdinalOptionsNumeric = {
  output?: 'numeric';
};

type OrdinalOptionsSuffix = {
  output?: 'suffix';
};

export type OrdinalOptions =
  | OrdinalOptionsAlphabetic
  | OrdinalOptionsNumeric
  | OrdinalOptionsSuffix;

function card(input: number, option: CardinalOptions): string {
  return input === 0 ? '' : `${cardinal(input, option)} `;
}

/**
 * Convert a number into an ordinal number string (1st, 2nd, 3rd, etc).
 * @param input - The number to convert
 * @group Math
 * @category Numbering
 */
export function ordinal(
  input: number,
  { output = 'numeric', ...options }: OrdinalOptions = {},
): string {
  if (isNaN(input) || !isFinite(input)) {
    return 'nth';
  } else if (isInteger(input)) {
    const sgn = Math.sign(input);
    const num = Math.abs(input);

    if (output === 'alphabetic') {
      const s = sgn < 0 ? 'negative ' : '';
      const digits2 = num % 100;
      const rest = num - digits2;
      if (digits2 === 0) {
        return rest === 0 ? 'zeroth' : `${cardinal(num, options)}th`;
      } else if (digits2 >= 0 && digits2 < 20) {
        return `${s}${card(rest, options)}${ordinalOnes[digits2]}`;
      } else if (digits2 % 10 === 0) {
        return `${s}${card(rest, options)}${ordinalTens[Math.floor(digits2 / 10) - 2]}`;
      }
      return `${s}${card(rest, options)}${tens[Math.floor(digits2 / 10) - 2]} ${ordinalOnes[digits2 % 10]}`;
    } else if (output === 'numeric') {
      const digits1 = num % 10;
      const rest = num - digits1;

      if (digits1 === 0) {
        return rest === 0 ? '0th' : `${sgn * num}th`;
      } else if (digits1 === 1 && num % 100 !== 11) {
        return `${sgn * num}st`;
      } else if (digits1 === 2 && num % 100 !== 12) {
        return `${sgn * num}nd`;
      } else if (digits1 === 3 && num % 100 !== 13) {
        return `${sgn * num}rd`;
      }
      return `${sgn * num}th`;
    }

    const digits1 = num % 10;
    switch (digits1) {
      case 1: {
        return 'st';
      }
      case 2: {
        return 'nd';
      }
      case 3: {
        return 'rd';
      }

      default: {
        return 'th';
      }
    }
  }
  return `${input.toString()}th`;
}
