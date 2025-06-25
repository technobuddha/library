import { clean } from './clean.ts';
import { space } from './constants.ts';

/**
 * @group String
 * @category Collapse
 */
export type CollapseWhitespaceOptions = {
  /** If true, trim  */
  trim?: boolean;
};

/**
 * Replace all whitespace within a string with a single space
 *
 * @param input - The string
 * @param trim - If true, remove leading and trailing whitespace
 * @group String
 * @category Collapse
 */
export function collapseWhitespace(
  input: string,
  { trim = true }: CollapseWhitespaceOptions = {},
): string {
  if (trim) {
    return clean(input.replaceAll(/\s+/gu, space), space);
  }
  return input.replaceAll(/\s+/gu, space);
}
