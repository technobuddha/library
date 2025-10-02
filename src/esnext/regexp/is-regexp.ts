import { isObject } from '../object/is-object.ts';

/**
 * Determines whether the provided value is a `RegExp` object.
 * @param value - The value to test.
 * @returns `true` if the value is a `RegExp` object; otherwise, `false`.
 * @example
 * ```typescript
 * isRegExp(/abc/); // true
 * isRegExp(new RegExp('abc')); // true
 * isRegExp('abc'); // false
 * isRegExp({}); // false
 * isRegExp(null); // false
 * ```
 * @group RegExp
 * @category Type Checking
 */
export function isRegExp(value: unknown): value is RegExp {
  return (
    isObject(value) &&
    (value instanceof RegExp || Object.prototype.toString.call(value) === '[object RegExp]')
  );
}
