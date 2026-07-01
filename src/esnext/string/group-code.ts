import { sortOrder } from '../tokenization/sort-order.ts';
import { toASCII } from '../unicode/to-ascii.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Determine the group code (A-Z, [] or #) to place an item under
 * @remarks The group code is made by taking the first letter of the *description*.  As a special
 * case descriptions starting with '[' are grouped under [] and anything that isn't a letter is grouped
 * under #.
 * @param input - a description
 * @returns The group code
 * @group String
 * @category Analysis
 */
export function groupCode(input: StringLike): string {
  const group = toASCII(sortOrder(toString(input)).slice(0, 1)).toLocaleUpperCase();

  if (group >= 'A' && group <= 'Z') {
    return group;
  }
  if (group === '[') {
    return '[]';
  }
  return '#';
}
