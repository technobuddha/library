import { cardinalOnes, cardinalTens } from '../constants.ts';
import { space } from '../unicode.ts';

import { type Numbering } from './numbering.ts';

const ZERO = 0;
const TEN = 10;
const TWENTY = 20;
const ONE_HUNDRED = 100;

/**
 * Converts a number less than 1000 into its English words representation as an array of strings.
 * @param input - The number to convert (should be in the range 0 to 999).
 * @param options - An object specifying formatting options:
 *   - and: A string to insert between hundreds and the remainder (e.g., "and" in "one hundred and one").
 *   - hyphen: A string to use as a hyphen between tens and ones (defaults to a space).
 * @returns An array of strings representing the number in words.
 * @example
 * ```typescript
 * hundreds(342, \{ and: "and", hyphen: "-" \}); // ["three", "hundred", "and", "forty-two"]
 * ```
 * @internal
 */
export function hundreds(input: number, { and, hyphen = space }: Numbering): string[] {
  let numInput = input;
  const words = [] as string[];

  if (numInput >= ONE_HUNDRED) {
    words.push(cardinalOnes[Math.floor(numInput / ONE_HUNDRED)], 'hundred');
    numInput %= ONE_HUNDRED;
    if (and && numInput > ZERO) {
      words.push(and);
    }
  }

  if (numInput > ZERO) {
    if (numInput < TWENTY) {
      words.push(cardinalOnes[numInput]);
    } else if (numInput % TEN === ZERO) {
      words.push(cardinalTens[Math.floor(numInput / TEN) - 2]);
    } else {
      words.push(
        cardinalTens[Math.floor(numInput / TEN) - 2] + hyphen + cardinalOnes[numInput % TEN],
      );
    }
  }

  return words;
}
