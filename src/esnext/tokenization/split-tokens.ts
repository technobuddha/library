import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

const delimiter = /(\s+|[\p{P}&&[^']])/v;

/**
 * Split a string into an array of tokens separated by whitespace.
 *
 * Unlike {@link extractWords}, this function does not remove punctuation or special characters; it only splits on whitespace.
 *
 * @param text - The string to split into tokens.
 * @returns An array of tokens from the input string.
 *
 * @example
 * ```typescript
 * splitTokens('Hello, world!'); // [ 'Hello,', 'world!' ]
 * splitTokens('foo:bar;baz');   // [ 'foo:bar;baz' ]
 * splitTokens('a-b—c');         // [ 'a-b—c' ]
 * ```
 *
 * @group String
 * @category Tokenization
 */
export function splitTokens(text: StringLike): string[] {
  const input = toString(text);
  if (input.length === 0) {
    return [];
  }
  return input.split(delimiter).filter((token) => token != null && token !== empty);
}
