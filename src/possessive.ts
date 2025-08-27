import { matchCase } from './match-case.ts';
import { removeDiacritics } from './remove-diacritics.ts';

/**
 * Determine the possessive form of a word
 *
 * @param input - The word
 * @returns The possessive form of the word
 * @example
 * ```typescript
 * possessive('Calvin');  // "Calvin's"
 * possessive('Hobbes');  // "Hobbes'"
 * possessive('BUGS');    // "BUGS'"
 * possessive('ELMER');   // "ELMER'S"
 * ```
 * @group English
 * @category Parts of Speech
 */
export function possessive(input: string): string {
  const last = removeDiacritics(input).at(-1);

  if (last === 's' || last === 'S') {
    return matchCase(`${input}'`, input);
  }
  return matchCase(`${input}'s`, input);
}
