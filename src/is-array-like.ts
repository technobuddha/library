import { isFunction } from './is-function.ts';
import { isNumber } from './is-number.ts';
import { isObject } from './is-object.ts';

function isLength(value: unknown): value is number {
  return isNumber(value) && value > -1 && value % 1 === 0 && value < Number.MAX_SAFE_INTEGER;
}

/**
 * Determines whether the provided value is array-like.
 *
 * A value is considered array-like if it is not null or undefined, is object-like,
 * is not a function, has a 'length' property, and the length is a valid array length.
 *
 * @param value - The value to check.
 * @returns True if the value is array-like, otherwise false.
 * @group Array
 * @category Type Check
 */
export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return (
    value != null &&
    isObject(value) &&
    !isFunction(value) &&
    'length' in value &&
    isLength(Object.length)
  );
}
