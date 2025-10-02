import { space } from '../unicode/unicode.ts';

import { clean } from './clean.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link collapseBreakingSpace} function
 * @group String
 * @category Clean
 */
export type CollapseBreakingSpaceOptions = {
  /** If true, trim leading and trailing whitespace */
  trim?: boolean;
};

/**
 * Replace all breaking space (space, tab, carriage return, new line) with a single space
 * @param input - The string
 * @param trim - If true, remove leading and trailing whitespace
 * @group String
 * @category Clean
 */
export function collapseBreakingSpace(
  input: StringLike,
  { trim = true }: CollapseBreakingSpaceOptions = {},
): string {
  const result = toString(input).replaceAll(/[\t\r\n ]+/gv, space);
  return trim ? clean(result, '\t\r\n ') : result;
}
