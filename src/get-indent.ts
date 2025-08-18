import { escapeRegExp, isNil } from 'lodash-es';

import { space } from './constants.ts';
import { type IndentOptions } from './indent.ts';

/**
 * Determine the indentation level of text
 *
 * @param input - The indented text
 * @param options - see {@link IndentOptions}
 * @defaultValue indenter space
 * @returns The minimum amount of indentation on each line
 * @group String
 * @category Indentation
 */
export function getIndent(input: string, { indenter = space }: IndentOptions = {}): number {
  const matches = new RegExp(`^(${escapeRegExp(indenter)})+`, 'ugm').exec(input);
  if (isNil(matches)) {
    return 0;
  }

  return Math.min(...matches.map((m) => m.length)) / indenter.length;
}
