import { space } from './unicode.ts';

/**
 * Return the number of unicode code points in a string
 * @param input - the unicode string
 * @returns the number of code points
 * @group Unicode
 * @category String Length
 */
export function unicodeLength(input: string): number {
  // eslint-disable-next-line require-unicode-regexp
  return input.replaceAll(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, space).length;
}
