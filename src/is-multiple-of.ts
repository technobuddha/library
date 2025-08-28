import { isNumber } from './is-number.ts';

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
 * @category Parity
 */
export function isMultipleOf(input: number, multiplier: number): boolean {
  return isNumber(input) && (input % multiplier === 0 || (input === 0 && multiplier === 0));
}
