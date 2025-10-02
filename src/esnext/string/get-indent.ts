import { escapeRegExp } from '../escape/escape-regexp.ts';
import { space } from '../unicode/unicode.ts';

import { type IndentOptions } from './indent.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Determine the indentation level of text
 * @param input - The indented text
 * @param options - see {@link IndentOptions}
 * @defaultValue indenter space
 * @returns The minimum amount of indentation on each line
 * @group String
 * @category Indentation
 */
export function getIndent(input: StringLike, { indenter = space }: IndentOptions = {}): number {
  const matches = new RegExp(`^(${escapeRegExp(indenter)})+`, 'vgm').exec(toString(input));
  if (matches == null) {
    return 0;
  }

  return Math.min(...matches.map((m) => m.length)) / indenter.length;
}
