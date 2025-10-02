import { empty } from '../unicode/unicode.ts';

import { build } from './build.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options to control which character classes are kept by {@link keep}.
 *
 * - If multiple options are set to true, all matching characters are kept.
 * - `alphabetic` matches only basic Latin A-Z and a-z.
 * - `letters` matches all Unicode letters p-L.
 * - `digits` matches 0-9.
 * - `whitespace` matches all Unicode whitespace s.
 * - `punctuation` matches all Unicode punctuation p-P.
 *
 * @group String
 * @category Filter
 */
export type KeepOptions = {
  /**
   * If true, all digit (0-9) characters will be kept in the string.
   */
  digits?: boolean;

  /**
   * If true, all basic Latin alphabetic (A-Z, a-z) characters will be kept.
   */
  alphabetic?: boolean;

  /**
   * If true, all Unicode letter characters p-L will be kept.
   */
  letters?: boolean;

  /**
   * If true, all whitespace characters s will be kept.
   */
  whitespace?: boolean;

  /**
   * If true, all Unicode punctuation characters p-P will be kept.
   */
  punctuation?: boolean;
};

/**
 * Returns a new string containing only the characters from the input that match the specified options.
 *
 * @param input - The string-like value to filter.
 * @param options - Which character classes to keep. See {@link KeepOptions}.
 * @returns The filtered string containing only the allowed character classes.
 *
 * @example
 * ```typescript
 * keep('abc123!@#', { digits: true }); // '123'
 * keep('abc123!@#', { alphabetic: true }); // 'abc'
 * keep('abc123!@#', { letters: true }); // 'abc'
 * keep('a 1!b2@c3#', { digits: true, alphabetic: true }); // 'a1b2c3'
 * keep('a 1!b2@c3#', { digits: true, alphabetic: true, whitespace: true }); // 'a 1b2c3'
 * keep('a 1!b2@c3#', { digits: true, letters: true, whitespace: true, punctuation: true }); // 'a 1b2c3#'
 * keep('!@#$', { digits: true, alphabetic: true, whitespace: true }); // ''
 * keep('', { digits: true, alphabetic: true, whitespace: true }); // ''
 * ```
 *
 * @group String
 * @category Filter
 */
export function keep(
  input: StringLike,
  {
    digits = false,
    alphabetic = false,
    letters = false,
    whitespace = false,
    punctuation = false,
  }: KeepOptions,
): string {
  const keeps: string[] = [];
  if (digits) {
    keeps.push('0-9');
  }
  if (alphabetic) {
    keeps.push('A-Za-z');
  }
  if (letters) {
    keeps.push('\\p{L}');
  }
  if (whitespace) {
    keeps.push('\\s');
  }
  if (punctuation) {
    keeps.push('\\p{P}');
  }

  const re = new RegExp(`[^${build(keeps)}]`, 'gv');

  return toString(input).replaceAll(re, empty);
}
