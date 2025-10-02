import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

const re = /^(\p{P})+$/v;

/**
 * Test a string for all punctuation characters
 * @param input - string to test
 * @returns true, if all characters in the string are punctuation
 * @group Unicode
 * @category Categorization
 */
export function isPunctuation(input: StringLike): boolean {
  return re.test(toString(input));
}
