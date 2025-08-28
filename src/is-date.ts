import { isObject } from './is-object.ts';

/**
 * Determines whether the provided value is a `Date` object.
 * @param value - The value to test.
 * @returns `true` if the value is a `Date` object, otherwise `false`.
 * @group Time
 * @category Type Check
 */
export function isDate(value: unknown): value is Date {
  return isObject(value) && Object.prototype.toString.call(value) === '[object Date]';
}
