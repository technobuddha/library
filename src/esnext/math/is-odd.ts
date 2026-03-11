import { type NumberLike } from '../number/number-like.ts';

import { isMultipleOf } from './is-multiple-of.ts';

/**
 * Tests to see if the specified value is an odd integer
 * @param input - The number to test
 * @returns true if the number is an odd integer
 * @example
 * ```typescript
 * isOdd(1); // true
 * isOdd(2); // false
 * isOdd(0); // false
 * isOdd(-3); // true
 * isOdd(3.1); // false
 * ```
 * @group Math
 * @category Comparison
 */
export function isOdd(input: NumberLike): boolean {
  return Number.isInteger(input) && !isMultipleOf(input, 2);
}
