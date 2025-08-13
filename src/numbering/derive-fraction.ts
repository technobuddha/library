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
  input: number,
  options: Pick<Numbering, 'tolerance' | 'precision' | 'denominators'>,
): FractionResult {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    return { numerator: input, denominator: 1 };
  }

  const { tolerance, precision } = options;
  const denominators = getDenominators(options.denominators);

  const matches = denominators
    .map((d) => {
      const numerator = Math.round(input * d);
      const difference = Number(Math.abs(input - numerator / d).toFixed(8));
      return { denominator: d, numerator, difference };
    })
    .filter(({ numerator, difference }) => numerator !== 0 && difference <= tolerance)
    .sort((a, b) => a.difference - b.difference || a.denominator - b.denominator);

  let denominator: number;
  let numerator: number;

  if (matches.length === 0 || (matches[0].denominator === 1 && input < 1)) {
    denominator = 10 ** precision;
    numerator = Math.round(input * denominator);

    while (numerator % 10 === 0 && denominator > 1) {
      numerator /= 10;
      denominator /= 10;
    }
  } else {
    [{ numerator, denominator }] = matches;
  }

  return { numerator, denominator };
}
