import { ansiEscapes as reAnsiEscapes } from '../regexp/ansi-escapes.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for stripping unwanted characters or sequences from strings.
 * @group String
 * @category Clean
 */
export type StripOptions = {
  /**
   * If true, ANSI escape codes will be removed from the string.
   */
  ansiEscapes?: boolean;
  /**
   * If true, all comments (single-line and multi-line) will be removed from the string.
   */
  comments?: boolean;
};

/**
 * Removes unwanted sequences from the input string.
 *
 * This function can strip various types of content from strings including ANSI escape codes,
 * non-digit characters, non-alphabetic characters, and comments.
 *
 * @param input - The string to be processed
 * @param options - Options to control what is stripped. See {@link StripOptions}
 * @returns The processed string with specified sequences removed
 *
 * @example
 * ```typescript
 * // Remove ANSI escape codes
 * strip('foo\u001B[31mbar\u001B[0m', { ansiEscapes: true });
 * // 'foobar'
 *
 * // Remove comments
 * strip('code // comment\nmore code /* block *\/', { comments: true });
 * // 'code \nmore code '
 *
 * // Combine multiple options
 * strip('foo\u001B[31m123// comment\nbar\u001B[0m456', { ansiEscapes: true, comments: true });
 * // 'foo123456'
 * ```
 *
 * @group String
 * @category Clean
 */
export function strip(
  input: StringLike,
  { ansiEscapes = false, comments = false }: StripOptions,
): string {
  let output = toString(input);

  if (comments) {
    output = output.replaceAll(/\/\/.*?\n|\/\*[\s\S]*?\*\//gv, empty);
  }

  if (ansiEscapes) {
    output = output.replaceAll(reAnsiEscapes, empty);
  }

  return output;
}
