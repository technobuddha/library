import { clean } from './clean.js';
import { space } from './constants.js';

export type CollapseBreakingSpaceOptions = {
  /** If true, trim  */
  trim?: boolean;
};

/**
 * Replace all breaking space (space, tab, carriage return, new line) with a single space
 *
 * @param input - The string
 * @param trim - If true, remove leading and trailing whitespace
 */
export function collapseBreakingspace(
  input: string,
  { trim = true }: CollapseBreakingSpaceOptions = {},
): string {
  const result = input.replaceAll(/[\t\r\n ]+/gu, space);
  return trim ? clean(result, '\t\r\n ') : result;
}
