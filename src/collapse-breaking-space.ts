import { clean } from './clean.ts';
import { space } from './constants.ts';

/**
 * @group String
 * @category Collapse
 */
export type CollapseBreakingSpaceOptions = {
  /** If true, trim  */
  trim?: boolean;
};

/**
 * Replace all breaking space (space, tab, carriage return, new line) with a single space
 *
 * @param input - The string
 * @param trim - If true, remove leading and trailing whitespace
 * @group String
 * @category Collapse
 */
export function collapseBreakingspace(
  input: string,
  { trim = true }: CollapseBreakingSpaceOptions = {},
): string {
  const result = input.replaceAll(/[\t\r\n ]+/gu, space);
  return trim ? clean(result, '\t\r\n ') : result;
}
