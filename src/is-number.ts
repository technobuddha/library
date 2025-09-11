/**
 * Determines whether the provided value is a number or a Number object.
 * @param value - The value to test.
 * @returns True if the value is a number or a Number object; otherwise, false.
 * @group Object
 * @category Type Guards
 * @example
 * ```typescript
 * isNumber(42); // true
 * isNumber(new Number(42)); // true
 * isNumber(NaN); // true
 * isNumber('42'); // false
 * isNumber(null); // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return (
    typeof value === 'number' ||
    (value != null &&
      typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Number]')
  );
}
