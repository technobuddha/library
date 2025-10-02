import { type NumberLike } from '../number/number-like.ts';

import { isMultipleOf } from './is-multiple-of.ts';

/**
 * Tests to see if the specified value is an even integer
 * @param input - The number to test
 * @returns true if the number is an even integer
 * @example
 * ```typescript
 * isEven(2); // true
 * isEven(3); // false
 * isEven(0); // true
 * isEven(-4); // true
 * isEven(2.2); // false
 * ```
 * @group Math
 * @category Comparison
 */
export function isEven(input: NumberLike): boolean {
  return Number.isInteger(input) && isMultipleOf(input, 2);
}
