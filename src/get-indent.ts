import { escapeRegExp, isNil } from 'lodash-es';

import { space } from './constants.ts';

/**
 * @group String
 * @category Indentation
 */
export type GetIndentOptions = {
  /** The indentation character */
  indenter?: string;
};

/**
 * Determine the indentation level of text
 *
 * @param input - The indented text
 * @param __namedParameters - see {@link GetIndentOptions}
 * @defaultValue indenter space
 * @returns The minimum amount of indentation on each line
 * @group String
 * @category Indentation
 */
export function getIndent(input: string, { indenter = space }: GetIndentOptions = {}): number {
  const matches = new RegExp(`^(${escapeRegExp(indenter)})+`, 'ugm').exec(input);
  if (isNil(matches)) {
    return 0;
  }

  return Math.min(...matches.map((m) => m.length)) / indenter.length;
}
