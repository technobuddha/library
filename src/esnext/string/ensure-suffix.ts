import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Add a suffix to a string, if it does not already have the suffix
 * @param text - The string
 * @param suffix - The suffix
 * @returns The string followed by the suffix
 * @group String
 * @category Construction
 */
export function ensureSuffix(text: StringLike, suffix: StringLike): string {
  const input = toString(text);
  const suf = toString(suffix);

  return input.endsWith(suf) ? input : input + suf;
}
