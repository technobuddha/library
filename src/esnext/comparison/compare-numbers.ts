/**
 * Compare two numbers
 * @param a - First number
 * @param b - Second number
 * @returns 0 if a == b; -1 if a \< b; 1 if a \> b
 * @example
 * ```typescript
 * compareNumbers(2, 3); // -1
 * compareNumbers(3, 2); // 1
 * compareNumbers(2, 2); // 0
 * compareNumbers(null, 2); // -1
 * compareNumbers(2, null); // 1
 * compareNumbers(null, null); // 0
 * ```
 * @group Number
 * @category Comparison
 */
export function compareNumbers(a: number | null, b: number | null): number {
  if (a === b) {
    return 0;
  }
  if (a == null) {
    return -1;
  }
  if (b == null) {
    return 1;
  }

  return a < b ? -1 : 1;
}
