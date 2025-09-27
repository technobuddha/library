import { isSurrogateHigh } from './is-surrogate.ts';
import { empty } from './unicode.ts';

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
 */
export function commonSuffix(text1: string, text2: string): string {
  const minLength = Math.min(text1.length, text2.length);

  for (let i = 0; i < minLength; ++i) {
    const c1 = text1.charCodeAt(text1.length - 1 - i);
    const c2 = text2.charCodeAt(text2.length - 1 - i);

    if (c1 !== c2) {
      if (isSurrogateHigh(c1) || isSurrogateHigh(c2)) {
        i--;
      }
      return i === 0 ? empty : text1.slice(-i);
    }
  }
  return minLength === 0 ? empty : text1.slice(-minLength);
}
