/**
 * Ensures that the provided value is returned as an array.
 *
 * If the value is already an array, it is returned as-is.
 * Otherwise, the value is wrapped in a new array.
 *
 * @typeParam T - The type of the value or array elements.
 * @param value - The value or array to convert to an array.
 * @returns An array containing the value(s).
 * @group Object
 * @category Conversion
 * @example
 * toArray(5); // [5]
 * toArray([1, 2, 3]); // [1, 2, 3]
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
