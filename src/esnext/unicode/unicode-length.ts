import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { space } from './unicode.ts';

/**
 * Return the number of unicode code points in a string
 * @param input - the unicode string
 * @returns the number of code points
 * @group Unicode
 * @category Operations
 */
export function unicodeLength(input: StringLike): number {
  // eslint-disable-next-line require-unicode-regexp
  return toString(input).replaceAll(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, space).length;
}
