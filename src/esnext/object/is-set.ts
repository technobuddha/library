/**
 * Determines whether the provided value is a `Set` instance.
 * @param value - The value to check.
 * @returns `true` if the value is a `Set`; otherwise, `false`.
 * @example
 * ```typescript
 * isSet(new Set()); // true
 * isSet(new Map()); // false
 * isSet({}); // false
 * ```
 * @group Object
 * @category Type Checking
 */
export function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set || Object.prototype.toString.call(value) === '[object Set]';
}
