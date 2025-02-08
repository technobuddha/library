import { escapeRegExp } from 'lodash-es';

import { empty, space } from './constants.js';
import { getIndent } from './get-indent.js';

export type UnindentOptions = {
  /** the indentation character */
  indenter?: string;
};

/**
 * Remove indentation from text
 *
 * @param input - The indented text
 * @param pattern - (space)
 */
export function unindent(input: string, { indenter = space }: UnindentOptions = {}): string {
  const indent = getIndent(input, { indenter });

  if (indent === 0) {
    return input;
  }

  return input.replaceAll(new RegExp(`^(${escapeRegExp(indenter)}){${indent}}`, 'gmu'), empty);
}
