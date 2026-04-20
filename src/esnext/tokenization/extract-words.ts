import { clean } from '../string/clean.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { isWhitespace } from '../unicode/is-whitespace.ts';
import { emDash, enDash } from '../unicode/unicode.ts';

const defaultDelimiter = new RegExp(`\\s+|[${enDash}${emDash},:;!?\\(\\)]+`, 'v');

/**
 * Options for the {@link extractWords} function.
 *
 * @example
 * ```typescript
 * extractWords('a,b,c', { delimiter: ',' }); // [ 'a', 'b', 'c' ]
 * ```
 *
 * @group String
 * @category Tokenization
 */
export type ExtractWordsOptions = {
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
 * @param options - Options for splitting. See {@link ExtractWordsOptions}.
 * @returns An array of words from the input string.
 *
 * @example
 * ```typescript
 * extractWords('Hello, world!'); // [ 'Hello', 'world' ]
 * extractWords('a-b—c', { delimiter: /-|—/ }); // [ 'a', 'b', 'c' ]
 * ```
 *
 * @defaultValue delimiter whitespace and punctuation
 * @group String
 * @category Tokenization
 */
export function extractWords(
  text: StringLike,
  { delimiter = defaultDelimiter }: ExtractWordsOptions = {},
): string[] {
  const input = toString(text);
  if (input.length === 0 || isWhitespace(input)) {
    return [];
  }
  return clean(input, delimiter).split(delimiter);
}
