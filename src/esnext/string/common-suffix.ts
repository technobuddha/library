import { isSurrogateHigh } from '../unicode/is-surrogate-high.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Determine the common suffix of two strings.
 * @param text1 - First string.
 * @param text2 - Second string.
 * @returns The common suffix shared by both strings.
 * @example
 * ```typescript
 * commonSuffix('foobar', 'bazbar'); // 'bar'
 * commonSuffix('running', 'jogging'); // 'ing'
 * commonSuffix('abc', 'xyz'); // ''
 * ```
 * @group String
 * @category Commonality
 */
export function commonSuffix(text1: StringLike, text2: StringLike): string {
  const input1 = toString(text1);
  const input2 = toString(text2);

  const minLength = Math.min(input1.length, input2.length);

  for (let i = 0; i < minLength; ++i) {
    const c1 = input1.charCodeAt(input1.length - 1 - i);
    const c2 = input2.charCodeAt(input2.length - 1 - i);

    if (c1 !== c2) {
      if (isSurrogateHigh(c1) || isSurrogateHigh(c2)) {
        i--;
      }
      return i === 0 ? empty : input1.slice(-i);
    }
  }
  return minLength === 0 ? empty : input1.slice(-minLength);
}
