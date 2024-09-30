import { escapeRegExp } from 'lodash-es';

import { empty, space } from './constants';
import getIndent from './get-Indent';

export type Options = {
  /** the indentation character */
  indenter?: string;
};

/**
 * Remove indentation from text
 *
 * @param input The indented text
 * @param pattern  (space)
 */
export function unindent(input: string, { indenter = space }: Options = {}): string {
  const indent = getIndent(input, { indenter });

  if (indent === 0) return input;

  return input.replaceAll(new RegExp(`^(${escapeRegExp(indenter)}){${indent}}`, 'mu'), empty);
}

export default unindent;
