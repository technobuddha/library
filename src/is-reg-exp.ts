import { isObject } from './is-object.ts';

/**
 * Determines whether the provided value is a `RegExp` object.
 * @param value - The value to test.
 * @returns `true` if the value is a `RegExp` object; otherwise, `false`.
 * @group Object
 * @category Type Guards
 * @example
 * ```typescript
 * isRegExp(/abc/); // true
 * isRegExp(new RegExp('abc')); // true
 * isRegExp('abc'); // false
 * isRegExp({}); // false
 * isRegExp(null); // false
 * ```
 */
export function isRegExp(value: unknown): value is RegExp {
  return isObject(value) && Object.prototype.toString.call(value) === '[object RegExp]';
}
