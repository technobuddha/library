import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Test a string for all white space characters
 * @param input - string to test
 * @returns true, if all characters in the string are white space
 * @group Unicode
 * @category Categorization
 */
export function isWhitespace(input: StringLike): boolean {
  return /^\s+$/v.test(toString(input));
}
