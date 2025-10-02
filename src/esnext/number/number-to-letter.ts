import { floor } from '../math/floor.ts';
import { empty } from '../unicode/unicode.ts';

import { type NumberLike } from './number-like.ts';
import { toNumber } from './to-number.ts';

// eslint-disable-next-line no-secrets/no-secrets
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Options for the {@link numberToLetter} function
 * @group Number
 * @category Formatting
 */
export type NumberToLetterOptions = {
  /** The alphabet to use */
  alphabet?: string;
};

/**
 * Convert a number to a letter, using the alphabet (default: A-Z)
 * @param num - The number to convert
 * @param options - see {@link NumberToLetterOptions}
 * @returns The letter
 * @group Number
 * @category Formatting
 */
export function numberToLetter(
  num: NumberLike,
  { alphabet = ALPHABET }: NumberToLetterOptions = {},
): string {
  let n = toNumber(num);
  const base = alphabet.length;
  const letters: string[] = [];

  do {
    --n;
    letters.unshift(alphabet[n % base]);
    n = floor(n / base, { tolerance: 0.005 });
  } while (n > 0);

  return letters.join(empty);
}
