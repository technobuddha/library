import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';

/**
 * Determine if the suffix of one string is the prefix of another.
 * @param text1 - First string.
 * @param text2 - Second string.
 * @returns The common overlap shared by both strings.
 * @example
 * ```typescript
 * commonOverlap('foobar', 'barbaz'); // 'bar'
 * commonOverlap('hello', 'love'); // 'lo'
 * commonOverlap('abc', 'xyz'); // ''
 * ```
 * @group String
 * @category Commonality
 */
export function commonOverlap(text1: StringLike, text2: StringLike): string {
  const input1 = text1.toString();
  const input2 = text2.toString();

  const minLength = Math.min(input1.length, input2.length);

  for (let i = 0; i < minLength; ++i) {
    let matched = true;
    for (let j = 0; j < minLength - i; j++) {
      const c1 = input1.charCodeAt(input1.length - minLength + i + j);
      const c2 = input2.charCodeAt(j);

      if (c1 !== c2) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return input1.slice(input1.length - minLength + i);
    }
  }
  return empty;
}
