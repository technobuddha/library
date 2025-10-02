import { type NumberLike } from '../number/number-like.ts';
import { type StringLike } from '../string/string-like.ts';

import { isSurrogateHigh } from './is-surrogate-high.ts';
import { isSurrogateLow } from './is-surrogate-low.ts';

/**
 * Determine is a character is a surrogate
 * @param input - the character to test, or the character code
 * @returns true if the specified character is a unicode surrogate
 * @group Unicode
 * @category Surrogates
 */
export function isSurrogate(input: StringLike | NumberLike): boolean {
  return isSurrogateHigh(input) || isSurrogateLow(input);
}
