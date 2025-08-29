import { deconstructNumber } from '../deconstruct-number.ts';
import { empty, negativeSign, space } from '../unicode.ts';

import { fabricateAlphabeticFraction } from './fabricate-alphabetic-fraction.ts';
import { fabricateAlphabeticInteger } from './fabricate-alphabetic-integer.ts';
import { fabricateNumericFraction } from './fabricate-numeric-fraction.ts';
import { fabricateNumericInteger } from './fabricate-numeric-integer.ts';
import { makeOrdinal } from './make-ordinal.ts';

/**
 * Options for controlling how numbers are converted to words or symbols.
 * @group Math
 * @category Verbalization
 */
export type Numbering = {
  /**
   * Output format for integer and fraction parts.
   * - integer: 'numeric' | 'alphabetic' | 'hybrid'
   * - fraction: 'numeric' | 'alphabetic'
   */
  output: {
    integer: 'numeric' | 'alphabetic' | 'hybrid';
    fraction: 'numeric' | 'alphabetic';
  };

  /** Word to place after the hundreds.  E.g., "one hundred and one" vs. "one hundred one" */
  and: string;

  /** Character to place between the tens and ones units. E.g., "twenty-one" vs. "twenty one" */
  hyphen: string;

  /** Maximum allowed difference between the actual and represented value. */
  tolerance: number;

  /**
   * Allowed denominators for fractions.
   * - 'common': typical denominators (2, 3, 4, etc.)
   * - 'wrench': denominators used in wrench sizes
   * - number[]: custom denominators
   */
  denominators: 'common' | 'wrench' | number[];

  /** Number of decimal places or significant digits to use (1-9). */
  precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  /** Whether to use ordinal form (e.g., "first", "second", "third"). */
  ordinal: boolean;

  /**
   * Whether to shift the output.
   * - false: no shift
   * - 'decimal': shift decimal part
   * - 'fraction': shift fraction part
   */
  shift: false | 'decimal' | 'fraction';
};

/**
 * Returns a string representation of the sign.
 * @param sign - The sign of the number, where `1` represents positive and `-1` represents negative.
 * @returns An empty string for positive sign, or the string `'negative '` for negative sign.
 * @internal
 */
export function signWord(sign: 1 | -1): string {
  return sign === 1 ? empty : 'negative ';
}

/**
 * Returns the string representation of a sign symbol based on the input value.
 * @param sign - The sign indicator, where `1` represents positive and `-1` represents negative.
 * @returns The corresponding sign symbol as a string.
 * @internal
 */
export function signSymbol(sign: 1 | -1): string {
  return sign === 1 ? empty : negativeSign;
}

/**
 * Converts a numeric input into a formatted string representation based on the provided options.
 *
 * The formatting can be numeric, alphabetic, or hybrid, and supports custom precision, ordinal forms,
 * and special handling for zero, NaN, and infinity values. The output can include both integer and fractional
 * parts, formatted according to the specified options.
 * @param input - The number to be formatted.
 * @param options - An object specifying formatting options, including:
 *   - `output`: Determines the style for integer and fractional parts (`numeric`, `alphabetic`, or `hybrid`).
 *   - `precision`: The number of decimal places to consider for the fractional part.
 *   - `ordinal`: Whether to return the ordinal form (e.g., "1st", "second", "zeroth").
 * @returns The formatted string representation of the input number according to the specified options.
 * @internal
 */
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

  const { sign, whole, fractional } = deconstructNumber(input, precision);
  const s = output.integer === 'numeric' ? signSymbol(sign) : signWord(sign);

  if (whole.value === 0 && fractional.value === 0) {
    const words = output.integer === 'alphabetic' ? `${s}zero` : `${s}0`;
    return ordinal ? makeOrdinal(words) : words;
  }

  const fractionalPart =
    output.fraction === 'numeric' ?
      fabricateNumericFraction(fractional, options)
    : fabricateAlphabeticFraction(fractional, options);

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

  if (fractional.value === 0) {
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
