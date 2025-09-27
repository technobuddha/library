import { isSurrogateLow } from './is-surrogate.ts';

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
 */
export function commonPrefix(text1: string, text2: string): string {
  const minLength = Math.min(text1.length, text2.length);

  for (let i = 0; i < minLength; ++i) {
    const c1 = text1.charCodeAt(i);
    const c2 = text2.charCodeAt(i);
    if (c1 !== c2) {
      if (isSurrogateLow(c1) || isSurrogateLow(c2)) {
        i--;
      }
      return text1.slice(0, i);
    }
  }
  return text1.slice(0, minLength);
}
