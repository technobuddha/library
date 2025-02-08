import { cardinalOnes, cardinalTens, space } from '../constants.ts';

import { type Numbering } from './numbering.ts';

const ZERO = 0;
const TEN = 10;
const TWENTY = 20;
const ONE_HUNDRED = 100;

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
