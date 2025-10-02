import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { isStringLike } from '../string/is-string-like.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const reAlphaNumeric = /^(\p{L}|\p{N})+$/v;

/**
 * Test a string for all alphanumeric characters
 * @param input - string to test
 * @returns true, if all characters in the string are alphanumeric
 * @group Unicode
 * @category Categorization
 */
export function isAlphaNumeric(char: StringLike | NumberLike): boolean {
  const unicode = isStringLike(char) ? toString(char) : String.fromCodePoint(toNumber(char));
  return reAlphaNumeric.test(unicode);
}
