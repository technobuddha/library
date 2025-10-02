import { clean } from '../string/clean.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { isWhitespace } from '../unicode/is-whitespace.ts';
import { emDash, enDash } from '../unicode/unicode.ts';

const defaultDelimiter = new RegExp(`\\s+|[${enDash}${emDash},:;!?\\(\\)]+`, 'v');

/**
 * Options for the {@link splitWords} function.
 *
 * @example
 * ```typescript
 * splitWords('a,b,c', { delimiter: ',' }); // [ 'a', 'b', 'c' ]
 * ```
 *
 * @group String
 * @category Tokenization
 */
export type SplitWordsOptions = {
  /**
   * The delimiter between words.
   *
   * If not provided, defaults to whitespace and common punctuation.
   */
  delimiter?: string | RegExp;
};

/**
 * Split a string into an array of words.
 *
 * @param text - The string to split into words.
 * @param options - Options for splitting. See {@link SplitWordsOptions}.
 * @returns An array of words from the input string.
 *
 * @example
 * ```typescript
 * splitWords('Hello, world!'); // [ 'Hello', 'world' ]
 * splitWords('a-b—c', { delimiter: /-|—/ }); // [ 'a', 'b', 'c' ]
 * ```
 *
 * @defaultValue delimiter whitespace and punctuation
 * @group String
 * @category Tokenization
 */
export function splitWords(
  text: StringLike,
  { delimiter = defaultDelimiter }: SplitWordsOptions = {},
): string[] {
  const input = toString(text);
  if (input.length === 0 || isWhitespace(input)) {
    return [];
  }
  return clean(input, delimiter).split(delimiter);
}
