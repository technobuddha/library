import { empty } from './unicode.ts';

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
 */
export function commonOverlap(text1: string, text2: string): string {
  const minLength = Math.min(text1.length, text2.length);

  for (let i = 0; i < minLength; ++i) {
    let matched = true;
    for (let j = 0; j < minLength - i; j++) {
      const c1 = text1.charCodeAt(text1.length - minLength + i + j);
      const c2 = text2.charCodeAt(j);

      if (c1 !== c2) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return text1.slice(text1.length - minLength + i);
    }
  }
  return empty;
}
