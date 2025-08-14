import { cleanEnd } from './clean.ts';
import { empty } from './constants.ts';

export type DeconstructedNumber = {
  value: number;
  sign: 1 | -1;
  mantissa: string;
  exponent: number;
};

export type DeconstructNumberReturn = DeconstructedNumber & {
  fraction: DeconstructedNumber;
  whole: DeconstructedNumber;
};

/**
 * Deconstructs a number into its sign, whole part, and fractional part.
 *
 * @param input - The number to deconstruct.
 * @returns An object containing the sign ('+' or '-'), the whole part, and the fractional part of the input number.
 */
export function deconstructNumber(input: number, precision = 9): DeconstructNumberReturn {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    throw new TypeError('Input must be a finite number.');
  }

  const prec = Math.min(Math.max(precision, 1), 15);

  const sign = Math.sign(input) < 0 ? -1 : 1;
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
      fraction: {
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
      fraction: {
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
    fraction: {
      sign,
      value: 0,
      mantissa: empty,
      exponent: 0,
    },
  };
}
