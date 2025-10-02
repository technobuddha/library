import { isSurrogateLow } from '../unicode/is-surrogate-low.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Determine the common prefix of two strings.
 * @param text1 - First string.
 * @param text2 - Second string.
 * @returns The common prefix shared by both strings.
 * @example
 * ```typescript
 * commonPrefix('foobar', 'foobaz'); // 'fooba'
 * commonPrefix('hello', 'helium'); // 'hel'
 * commonPrefix('abc', 'xyz'); // ''
 * ```
 * @group String
 * @category Commonality
 */
export function commonPrefix(text1: StringLike, text2: StringLike): string {
  const input1 = toString(text1);
  const input2 = toString(text2);
  const minLength = Math.min(input1.length, input2.length);

  for (let i = 0; i < minLength; ++i) {
    const c1 = input1.charCodeAt(i);
    const c2 = input2.charCodeAt(i);
    if (c1 !== c2) {
      if (isSurrogateLow(c1) || isSurrogateLow(c2)) {
        i--;
      }
      return input1.slice(0, i);
    }
  }
  return input1.slice(0, minLength);
}
