import clean from './clean';
import { space } from './constants';

export type Options = {
  /** If true, trim  */
  trim?: boolean;
};

/**
 * Replace all whitespace within a string with a single space
 *
 * @param input The string
 * @param trim If true, remove leading and trailing whitespace
 */
export function collapseWhitespace(input: string, { trim = true }: Options = {}): string {
  if (trim) return clean(input.replaceAll(/\s+/gu, space), space);
  return input.replaceAll(/\s+/gu, space);
}

export default collapseWhitespace;
