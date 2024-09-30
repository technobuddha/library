import clean from './clean';
import { space } from './constants';

export type Options = {
  /** If true, trim  */
  trim?: boolean;
};

/**
 * Replace all breaking space (space, tab, carriage return, new line) with a single space
 *
 * @param input The string
 * @param trim  If true, remove leading and trailing whitespace
 */
export function collapseBreakingspace(input: string, { trim = true }: Options = {}): string {
  if (trim) return clean(input.replaceAll(/[\t\r\n ]+/gu, space), '\t\r\n ');
  return input.replaceAll(/[\t\r\n ]+/gu, space);
}

export default collapseBreakingspace;
