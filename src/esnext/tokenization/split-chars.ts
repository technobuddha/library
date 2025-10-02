import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Split a string into an array of characters
 * @param input - The string
 * @returns array of characters
 * @group Tokenization
 * @category Characters
 */
export function splitChars(input: StringLike): string[] {
  return Array.from(toString(input));
}
