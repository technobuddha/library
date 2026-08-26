/**
 * Determines whether the provided value is an array.
 *
 * This is a type guard for values that are arrays, allowing downstream code to
 * narrow the type to an array of the desired item type.
 * @param value - The value to check.
 * @returns True if the value is an array, otherwise false.
 * @example
 * ```typescript
 * isArray([1, 2, 3]); // true
 * isArray('hello'); // false
 * isArray({ length: 2 }); // false
 * ```
 * @group Array
 * @category Type Checking
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}
