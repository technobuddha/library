import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
/**
 * Tests to see if the specified value is negative zero
 * @param input - The number to test
 * @returns true is the number is negative zero
 * @example
 * ```typescript
 * isNegativeZero(-0); // true
 * isNegativeZero(0); // false
 * isNegativeZero(1); // false
 * isNegativeZero(-1); // false
 * ```
 * @group Math
 * @category Comparison
 */
export function isNegativeZero(input: NumberLike): boolean {
  const value = toNumber(input);
  return value === 0 && 1 / value < 0;
}
