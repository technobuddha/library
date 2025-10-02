import { escapeRegExp } from '../escape/escape-regexp.ts';
import { empty, space } from '../unicode/unicode.ts';

import { getIndent } from './get-indent.ts';
import { type IndentOptions } from './indent.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Remove indentation from text
 * @param input - The indented text
 * @param pattern - (space)
 * @group String
 * @category Indentation
 */
export function unindent(input: StringLike, { indenter = space }: IndentOptions = {}): string {
  const text = toString(input);
  const indent = getIndent(text, { indenter });

  if (indent === 0) {
    return text;
  }

  return text.replaceAll(new RegExp(`^(${escapeRegExp(indenter)}){${indent}}`, 'vgm'), empty);
}
