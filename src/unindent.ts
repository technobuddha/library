import { getIndent } from './get-indent.ts';
import { type IndentOptions } from './indent.ts';
import { empty, space } from './unicode.ts';

/**
 * Remove indentation from text
 * @param input - The indented text
 * @param pattern - (space)
 * @group String
 * @category Indentation
 */
export function unindent(input: string, { indenter = space }: IndentOptions = {}): string {
  const indent = getIndent(input, { indenter });

  if (indent === 0) {
    return input;
  }

  return input.replaceAll(new RegExp(`^(${RegExp.escape(indenter)}){${indent}}`, 'gmu'), empty);
}
