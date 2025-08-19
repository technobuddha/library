import { isObject } from './is-object.ts';

/**
 * Determines whether the provided value is a `RegExp` object.
 *
 * @param value - The value to test.
 * @returns `true` if the value is a `RegExp` object; otherwise, `false`.
 * @group Utility
 * @category Type Checking
 */
export function isRegExp(value: unknown): value is RegExp {
  return isObject(value) && Object.prototype.toString.call(value) === '[object RegExp]';
}
