/**
 * Determines whether the provided value is a number or a Number object.
 *
 * @param value - The value to test.
 * @returns True if the value is a number or a Number object; otherwise, false.
 * @group Utility
 * @category Type Checking
 */
export function isNumber(value: unknown): value is number {
  return (
    typeof value === 'number' ||
    (value != null &&
      typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Number]')
  );
}
