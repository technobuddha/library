import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { isStringLike } from '../string/is-string-like.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Determine is a character is a high surrogate
 * @param input - the character to test, or the character code
 * @returns true if the specified character is a unicode high surrogate
 * @group Unicode
 * @category Surrogates
 */
export function isSurrogateHigh(input: StringLike | NumberLike): boolean {
  const cc = isStringLike(input) ? toString(input).charCodeAt(0) : toNumber(input);

  return cc >= 0xd800 && cc <= 0xdbff;
}
