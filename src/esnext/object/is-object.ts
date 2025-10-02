import { type ObjectLike } from './object-like.ts';

/**
 * Determines whether the provided value is a non-null object.
 * @param value - The value to check.
 * @returns `true` if the value is an object and not `null`; otherwise, `false`.
 * @example
 * ```typescript
 * isObject({}); // true
 * isObject([]); // true
 * isObject(null); // false
 * isObject(42); // false
 * isObject('hello'); // false
 * ```
 * @group Object
 * @category Type Checking
 */
export function isObject(value: unknown): value is ObjectLike {
  return typeof value === 'object' && value != null;
}
