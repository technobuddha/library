/**
 * Determines whether the provided value is a number or a Number object.
 * @param value - The value to test.
 * @returns True if the value is a number or a Number object; otherwise, false.
 * @example
 * ```typescript
 * isNumber(42); // true
 * isNumber(new Number(42)); // true
 * isNumber(NaN); // true
 * isNumber('42'); // false
 * isNumber(null); // false
 * ```
 * @group Number
 * @category Type Checking
 */
export function isNumber(value: unknown): value is number {
  return (
    typeof value === 'number' ||
    (typeof value === 'object' &&
      value != null &&
      Object.prototype.toString.call(value) === '[object Number]')
  );
}
