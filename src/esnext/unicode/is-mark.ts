import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { isStringLike } from '../string/is-string-like.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const reMark = /^(\p{M})+$/v;

/**
 * Determines if a character is a Unicode mark (combining diacritical mark).
 *
 * @param char - The character to test (string or number-like)
 * @returns True if the character is a Unicode mark, otherwise false
 *
 * @example
 * isMark("\\u0301") // returns true
 * isMark("a") // returns false
 *
 * @group String
 * @category Unicode
 */
export function isMark(char: StringLike | NumberLike): boolean {
  const unicode = isStringLike(char) ? toString(char) : String.fromCodePoint(toNumber(char));
  return reMark.test(unicode);
}
