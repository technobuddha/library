import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const re = /^(\p{Lu})+$/v;

/**
 * Test a string for all upper case characters
 * @param input - string to test
 * @returns true, if all characters in the string are upper case
 * @group Unicode
 * @category Categorization
 */
export function isUpperCase(input: StringLike): boolean {
  return re.test(toString(input));
}
