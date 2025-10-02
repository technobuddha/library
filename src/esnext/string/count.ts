import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link count} function
 * @group String
 * @category Analysis
 */
export type CountOptions = {
  /** if true, counts overlapping strings */
  overlap?: boolean;
};

/**
 * Compute the number of times a substring occurs within a string
 * @param text - The string
 * @param substring - The substring to look for
 * @param options - see {@link CountOptions}
 * @returns number of times *substring* occurs within *input*
 * @group String
 * @category Analysis
 */
export function count(
  text: StringLike,
  substring: string,
  { overlap = false }: CountOptions = {},
): number {
  const input = toString(text);
  const step = overlap ? 1 : substring.length;
  let cnt = 0;
  let pos = 0;

  while ((pos = input.indexOf(substring, pos)) >= 0) {
    cnt++;
    pos += step;
  }

  return cnt;
}
