import { empty } from '../unicode/unicode.ts';

import { isStringLike } from './is-string-like.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Concatenates strings and/or arrays of strings
 * @param args - Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 * @group String
 * @category Construction
 */
export function build(...args: (StringLike | Iterable<string> | null | undefined)[]): string {
  const strings: string[] = [];

  for (const arg of args) {
    if (arg == null) {
      continue;
    } else if (isStringLike(arg)) {
      strings.push(toString(arg));
    } else {
      strings.push(...arg);
    }
  }

  return strings.join(empty);
}
