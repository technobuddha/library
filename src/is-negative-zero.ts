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
export function isNegativeZero(input: number): boolean {
  return input === 0 && 1 / input < 0;
}
