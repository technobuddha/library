import { isArrayLike } from '../array/is-array-like.ts';

import { isObject } from './is-object.ts';

/**
 * Determines if a value is empty.
 *
 * - For strings and arrays, returns `true` if the length is zero.
 * - For Maps and Sets, returns `true` if the size is zero.
 * - For objects, returns `true` if there are no enumerable keys.
 *
 * @param value - The value to check for emptiness.
 * @returns `true` if the value is empty, otherwise `false`.
 *
 * @group Object
 * @category Type Checking
 */
export function isEmpty(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.length === 0;
  }
  if (isArrayLike(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (isObject(value)) {
    return Reflect.ownKeys(value).length === 0;
  }
  return false;
}
