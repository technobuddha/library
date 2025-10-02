import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { isStringLike } from '../string/is-string-like.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const reLowerCase = /^(\p{Ll})+$/v;

/**
 * Test a string for all lower case characters
 * @param input - string to test
 * @returns true, if all characters in the string are lower case
 * @group Unicode
 * @category Categorization
 */
export function isLowerCase(char: StringLike | NumberLike): boolean {
  const unicode = isStringLike(char) ? toString(char) : String.fromCodePoint(toNumber(char));
  return reLowerCase.test(unicode);
}
