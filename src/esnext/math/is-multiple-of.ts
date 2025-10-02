import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Tests to see if the specified value is an multiple of *multiplier*
 * @param input - The number to test
 * @param multiplier - The multiplier
 * @returns true, if the number is a multiple
 * @example
 * ```typescript
 * isMultipleOf(6, 3); // true
 * isMultipleOf(7, 3); // false
 * isMultipleOf(0, 5); // true
 * isMultipleOf(10, 2); // true
 * isMultipleOf(10, 0); // false
 * isMultipleOf(0, 0); // true
 * ```
 * @group Math
 * @category Comparison
 */
export function isMultipleOf(input: NumberLike, multiplier: NumberLike): boolean {
  const value = toNumber(input);
  const mul = toNumber(multiplier);

  return value % mul === 0 || (value === 0 && mul === 0);
}
