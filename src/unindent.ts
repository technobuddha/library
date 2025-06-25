import { escapeRegExp } from 'lodash-es';

import { empty, space } from './constants.ts';
import { getIndent } from './get-indent.ts';

/**
 * @group String
 * @category Indentation
 */
export type UnindentOptions = {
  /** the indentation character */
  indenter?: string;
};

/**
 * Remove indentation from text
 *
 * @param input - The indented text
 * @param pattern - (space)
 * @group String
 * @category Indentation
 */
export function unindent(input: string, { indenter = space }: UnindentOptions = {}): string {
  const indent = getIndent(input, { indenter });

  if (indent === 0) {
    return input;
  }

  return input.replaceAll(new RegExp(`^(${escapeRegExp(indenter)}){${indent}}`, 'gmu'), empty);
}
