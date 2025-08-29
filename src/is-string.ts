import { isObject } from './is-object.ts';

/**
 * Determines whether the provided value is a string.
 *
 * This function checks if the value is a primitive string or a String object.
 * @param value - The value to check.
 * @returns True if the value is a string or a String object, otherwise false.
 * @group Object
 * @category Type Guards
 * @example
 * ```typescript
 * isString('hello'); // true
 * isString(new String('hello')); // true
 * isString(42); // false
 * isString(['a', 'b']); // false
 * isString(null); // false
 * ```
 */
export function isString(value: unknown): value is string {
  return (
    typeof value === 'string' ||
    (!Array.isArray(value) &&
      isObject(value) &&
      Object.prototype.toString.call(value) === '[object String]')
  );
}
