import { space } from '../unicode/unicode.ts';

import { clean } from './clean.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link collapseWhitespace} function
 * @group String
 * @category Clean
 */
export type CollapseWhitespaceOptions = {
  /** If true, trim  */
  trim?: boolean;
};

/**
 * Replace all whitespace within a string with a single space
 * @param input - The string
 * @param trim - If true, remove leading and trailing whitespace
 * @group String
 * @category Clean
 */
export function collapseWhitespace(
  input: StringLike,
  { trim = true }: CollapseWhitespaceOptions = {},
): string {
  const result = toString(input).replaceAll(/[\s+]+/gv, space);
  return trim ? clean(result, space) : result;
}
