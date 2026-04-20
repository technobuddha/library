import { matchCase } from '../case-conversion/match-case.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { removeDiacritics } from '../unicode/remove-diacritics.ts';

/**
 * Determine the possessive form of a word
 * @param noun - The word
 * @returns The possessive form of the word
 * @example
 * ```typescript
 * possessive('Calvin');  // "Calvin's"
 * possessive('Hobbes');  // "Hobbes'"
 * possessive('BUGS');    // "BUGS'"
 * possessive('ELMER');   // "ELMER'S"
 * ```
 * @group English
 * @category Possessives
 */
export function possessive(noun: StringLike): string {
  const word = toString(noun);
  const last = removeDiacritics(word).at(-1);

  if (last === 's' || last === 'S') {
    return matchCase(`${word}'`, word);
  }
  return matchCase(`${word}'s`, word);
}
