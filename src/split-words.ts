import { clean } from './clean.js';
import { isWhitespace } from './is-whitespace.js';

export type SplitWordsOptions = {
  /** The delimiter between words */
  delimiter?: string | RegExp;
};

/**
 * Split a string into an array of words
 *
 * @param input - The string to split
 * @param __namedParameters - see {@link SplitWordsOptions}
 * @defaultValue delimiter whitespace
 * @returns array of words
 */
export function splitWords(
  input: string,
  { delimiter = /\s+/u }: SplitWordsOptions = {},
): string[] {
  if (input.length === 0 || isWhitespace(input)) {
    return [];
  }
  return clean(input, delimiter).split(delimiter);
}
