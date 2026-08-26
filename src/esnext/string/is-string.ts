import { isArray } from '../array/is-array.ts';
import { isObject } from '../object/is-object.ts';

/**
 * Determines whether the provided value is a string.
 *
 * This function checks if the value is a primitive string or a String object.
 * @param value - The value to check.
 * @returns True if the value is a string or a String object, otherwise false.
 * @example
 * ```typescript
 * isString('hello'); // true
 * isString(new String('hello')); // true
 * isString(42); // false
 * isString(['a', 'b']); // false
 * isString(null); // false
 * ```
 * @group String
 * @category Type Checking
 */
export function isString(value: unknown): value is string {
  return (
    typeof value === 'string' ||
    (!isArray(value) &&
      isObject(value) &&
      Object.prototype.toString.call(value) === '[object String]')
  );
}
