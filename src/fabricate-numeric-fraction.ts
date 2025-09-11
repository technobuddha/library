import { type DeconstructedNumber } from './@types/deconstructed-number.ts';
import { deconstructNumber } from './deconstruct-number.ts';
import { deriveFraction } from './derive-fraction.ts';
import { type Numbering } from './numbering.ts';
import { fractionSlash } from './unicode.ts';

/**
 * Options for fabricating a numeric fraction.
 *
 * This type combines the 'ordinal' property from the `Numbering` type
 * and the options accepted by the second parameter of the `deriveFraction` function.
 * @internal
 */
type FNFOptions = Pick<Numbering, 'ordinal'> & Parameters<typeof deriveFraction>[1];

/**
 * Converts a numeric input into a fractional string representation.
 * @param input - The numeric value to be converted into a fraction.
 * @param options - Configuration options for fraction formatting.
 * @returns The formatted fractional string, or `null` if the numerator is zero.
 * @internal
 */
export function fabricateNumericFraction(
  input: DeconstructedNumber,
  options: FNFOptions,
): string | null {
  const { numerator, denominator } = deriveFraction(input, options);

  if (numerator === 0) {
    return null;
  }

  const zero = '0';
  const { mantissa, exponent } = deconstructNumber(denominator, Infinity);
  const num = `${mantissa}${zero.repeat(exponent - mantissa.length + 1)}`;

  return `${numerator}${fractionSlash}${num}`;
}
