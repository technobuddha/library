import { empty } from './constants.ts';

export type DeconstructedNumber = {
  sign: 1 | -1;
  whole: number;
  fractional: number;
  mantissa: string;
  exponent: number;
};

/**
 * Deconstructs a number into its sign, whole part, and fractional part.
 *
 * @param input - The number to deconstruct.
 * @returns An object containing the sign ('+' or '-'), the whole part, and the fractional part of the input number.
 */
export function deconstructNumber(input: number, precision = 9): DeconstructedNumber {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    throw new TypeError('Input must be a finite number.');
  }

  const prec = Math.min(Math.max(precision, 1), 15);

  const sign = Math.sign(input) < 0 ? -1 : 1;
  const positive = Math.abs(input);

  const numeric = positive.toExponential(prec - 1);
  const [m, e] = numeric.split('e');
  const mantissa = m.replace('.', empty);
  const exponent = Number.parseInt(e);

  if (exponent < 0) {
    const whole = 0;
    const fractional = positive;

    return { sign, whole, fractional, mantissa, exponent };
  }

  if (exponent < precision) {
    const whole = Number.parseFloat(
      `${mantissa.slice(0, 1)}.${mantissa.slice(1, exponent + 1)}e${e}`,
    );
    const fractional = Number.parseFloat(
      `0.${mantissa.slice(exponent + 1)}e${Number(e) - exponent}`,
    );

    return { sign, whole, fractional, mantissa, exponent };
  }

  const whole = positive;
  const fractional = 0;

  return { sign, whole, fractional, mantissa, exponent };
}
