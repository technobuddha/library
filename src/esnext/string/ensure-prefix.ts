import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Add a prefix to a string, if it does not already have the prefix
 * @param text - The string
 * @param prefix - The prefix
 * @returns The prefix followed by the string
 * @group String
 * @category Construction
 */
export function ensurePrefix(text: StringLike, prefix: StringLike): string {
  const input = toString(text);
  const pre = toString(prefix);

  return input.startsWith(pre) ? input : pre + input;
}
