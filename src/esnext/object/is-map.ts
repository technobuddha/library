/**
 * Determines whether the provided value is a `Map` instance.
 * @param value - The value to check.
 * @returns `true` if the value is a `Map`; otherwise, `false`.
 * @example
 * ```typescript
 * isMap(new Map()); // true
 * isMap(new Set()); // false
 * isMap({}); // false
 * ```
 * @group Object
 * @category Type Checking
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map || Object.prototype.toString.call(value) === '[object Map]';
}
