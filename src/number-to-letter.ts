import { empty } from './constants';
import floor from './floor';

// cspell:disable-next-line
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Options = {
  /** The alphabet to use */
  alphabet?: string;
};

export function numberToLetter(num: number, { alphabet = ALPHABET }: Options = {}): string {
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

export default numberToLetter;
