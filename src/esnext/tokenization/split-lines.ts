import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

const reSplitLines = /\r\n|\n\r|\r|\n|\0/v;

/**
 * Split a string into an array of lines
 * @param input - The string to split
 * @returns array of lines
 * @group Tokenization
 * @category Lines
 */
export function splitLines(input: StringLike): string[] {
  const text = toString(input);
  if (text === empty) {
    return [];
  }
  return text.split(reSplitLines);
}
