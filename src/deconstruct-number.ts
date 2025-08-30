import { type DeconstructedNumber } from './@types/deconstructed-number.ts';
import { clamp } from './clamp.ts';
import { cleanEnd } from './clean-end.ts';
import { isNegativeZero } from './is-negative-zero.ts';
import { empty } from './unicode.ts';

/**
 * Deconstructs a number into its sign, value, mantissa, and exponent, and separates its whole and fractional parts.
 * @param input - The number to deconstruct. Must be a finite number.
 * @param precision - The number of significant digits to use (default: 9, min: 1, max: 15).
 * @returns An object containing the normalized value, sign, mantissa, exponent, and separate representations
 *          of the whole and fractional parts.
 * @throws `TypeError` If the input is NaN or not a finite number.
 * @example
 * ```typescript
 * const result = deconstructNumber(123.456);
 * // result = {
 * //   value: 123.456,
 * //   sign: 1,
 * //   mantissa: "123456",
 * //   exponent: 2,
 * //   whole: { ... },
 * //   fraction: { ... }
 * // }
 * ```
 * @group Math
 * @category Number
 */
export function deconstructNumber(
  input: number,
  precision = 9,
): DeconstructedNumber & {
  /** The fractional part of the number. */
  fractional: DeconstructedNumber;
  /** The whole part of the number. */
  whole: DeconstructedNumber;
} {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    throw new TypeError('Input must be a finite number.');
  }

  const prec = clamp(precision, 1, 15);

  const sign =
    isNegativeZero(input) ? -1
    : Math.sign(input) < 0 ? -1
    : 1;
  const positive = Math.abs(input);

  const numeric = positive.toExponential(prec - 1);
  const value = Number.parseFloat(numeric);
  const [m, e] = numeric.split('e');
  const mantissa = cleanEnd(m.replace('.', empty), '0');
  const exponent = Number.parseInt(e);

  if (exponent < 0) {
    return {
      value,
      sign,
      mantissa,
      exponent,
      whole: {
        sign,
        value: 0,
        mantissa: empty,
        exponent: 0,
      },
      fractional: {
        sign,
        value,
        mantissa,
        exponent,
      },
    };
  }

  if (exponent < mantissa.length) {
    const wholeMantissa = `${mantissa.slice(0, 1)}.${mantissa.slice(1, exponent + 1)}`;
    const fractionMantissa = mantissa.slice(exponent + 1);

    const whole = Number.parseFloat(`${wholeMantissa}e${exponent}`);
    const fraction = Number.parseFloat(`0.${fractionMantissa}e0`);

    return {
      value,
      sign,
      mantissa,
      exponent,
      whole: {
        sign,
        value: whole,
        mantissa: wholeMantissa.replace('.', empty),
        exponent: exponent,
      },
      fractional: {
        sign,
        value: fraction,
        mantissa: fraction === 0 ? empty : fractionMantissa.replace('.', empty),
        exponent: fraction === 0 ? 0 : -1,
      },
    };
  }

  return {
    value,
    sign,
    mantissa,
    exponent,
    whole: {
      sign,
      value,
      mantissa,
      exponent,
    },
    fractional: {
      sign,
      value: 0,
      mantissa: empty,
      exponent: 0,
    },
  };
}
