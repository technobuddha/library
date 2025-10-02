/**
 * Determines whether the provided value is a boolean or a Boolean object.
 * @param value - The value to test.
 * @returns True if the value is a primitive boolean or a Boolean object; otherwise, false.
 * @example
 * ```typescript
 * isBoolean(true); // true
 * isBoolean(false); // true
 * isBoolean(new Boolean(false)); // true
 * isBoolean(0); // false
 * isBoolean('true'); // false
 * ```
 * @group Boolean
 * @category Type Checking
 */
export function isBoolean(value: unknown): value is boolean {
  return (
    typeof value === 'boolean' ||
    (value != null &&
      typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Boolean]')
  );
}
