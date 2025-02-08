import { type DeconstructedNumber } from '../@types/deconstructed-number.ts';

import { getDenominators } from './get-denominators.ts';
import { type Numbering } from './numbering.ts';

type FractionResult = {
  numerator: number;
  denominator: number;
};

/**
 * Finds the closest fractional representation of a given number within a specified tolerance and precision.
 *
 * @param input - The decimal number to approximate as a fraction.
 * @param options - Configuration options for the fraction search.
 * @returns An object containing the numerator and denominator of the closest fraction.
 */
export function deriveFraction(
  input: DeconstructedNumber,
  options: Pick<Numbering, 'tolerance' | 'precision' | 'denominators'>,
): FractionResult {
  const { tolerance } = options;
  const denominators = getDenominators(options.denominators);

  const matches = denominators
    .map((d) => {
      const numerator = Math.round(input.value * d);
      const difference = Number(Math.abs(input.value - numerator / d).toFixed(8));
      return { denominator: d, numerator, difference };
    })
    .filter(({ numerator, difference }) => numerator !== 0 && difference <= tolerance)
    .sort((a, b) => a.difference - b.difference || a.denominator - b.denominator);

  let denominator: number;
  let numerator: number;

  if (matches.length === 0 || (matches[0].denominator === 1 && input.value < 1)) {
    denominator = 10 ** (input.mantissa.length - input.exponent);
    numerator = Math.round(input.value * denominator);

    while (numerator % 10 === 0 && denominator > 1) {
      numerator /= 10;
      denominator /= 10;
    }
  } else {
    [{ numerator, denominator }] = matches;
  }

  return { numerator, denominator };
}
