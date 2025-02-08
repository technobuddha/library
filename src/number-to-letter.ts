import { empty } from './constants.js';
import { floor } from './floor.js';

// eslint-disable-next-line no-secrets/no-secrets
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export type NumberToLetterOptions = {
  /** The alphabet to use */
  alphabet?: string;
};

export function numberToLetter(
  num: number,
  { alphabet = ALPHABET }: NumberToLetterOptions = {},
): string {
  let n = num;
  const base = alphabet.length;
  const letters: string[] = [];

  do {
    --n;
    letters.unshift(alphabet[n % base]);
    n = floor(n / base, { tolerance: 0.005 });
  } while (n > 0);

  return letters.join(empty);
}
