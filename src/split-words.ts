import { clean } from './clean.ts';
import { isWhitespace } from './is-whitespace.ts';

/**
 * Options for the {@link splitWords} function
 *
 * @group String
 * @category Split
 */
export type SplitWordsOptions = {
  /** The delimiter between words */
  delimiter?: string | RegExp;
};

/**
 * Split a string into an array of words
 *
 * @param input - The string to split
 * @param options - see {@link SplitWordsOptions}
 * @defaultValue delimiter whitespace
 * @returns array of words
 * @group String
 * @category Split
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
