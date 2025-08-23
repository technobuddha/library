/**
 * Determines whether the provided value is a non-null object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an object and not `null`; otherwise, `false`.
 * @group Utility
 * @category Type Checking
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
