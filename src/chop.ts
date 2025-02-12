import { isFinite } from 'lodash-es';

import { empty } from './constants.js';

/**
 * @group String
 * @category Chop
 */
export type ChopOptions = {
  /** If true, the last block will be omitted if has insufficient characters **/
  truncate?: boolean;
};

/**
 * Break a string into equal sized segments of characters
 *
 * @param input - The string to break apart
 * @param length - The length of each segment
 * @returns Array of segments
 * @group String
 * @category Chop
 */
export function chop(
  input: string,
  length: number,
  { truncate = false }: ChopOptions = {},
): string[] {
  return length > 0 && isFinite(length) ?
      (input.match(new RegExp(`.{${truncate ? empty : '1,'}${length}}`, 'gu')) as string[])
    : [input];
}
