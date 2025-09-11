/**
 * Determines whether the provided value is a non-null object.
 * @param value - The value to check.
 * @returns `true` if the value is an object and not `null`; otherwise, `false`.
 * @group Object
 * @category Type Guards
 * @example
 * ```typescript
 * isObject({}); // true
 * isObject([]); // true
 * isObject(null); // false
 * isObject(42); // false
 * isObject('hello'); // false
 * ```
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
