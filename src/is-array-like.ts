import { isFunction } from './is-function.ts';
import { isNumber } from './is-number.ts';
import { isObject } from './is-object.ts';

// eslint-disable-next-line no-secrets/no-secrets
/**
 * Checks if a value is a valid array-like length.
 *
 * A valid length is a non-negative integer less than Number.MAX_SAFE_INTEGER.
 * Used internally to validate the 'length' property of array-like objects.
 * @param value - The value to check.
 * @returns True if the value is a valid array-like length, otherwise false.
 * @example
 * ```typescript
 * isLength(3); // true
 * isLength(-1); // false
 * isLength(3.5); // false
 * isLength(Number.MAX_SAFE_INTEGER + 1); // false
 * ```
 * @internal
 */
function isLength(value: unknown): value is number {
  return isNumber(value) && value > -1 && value % 1 === 0 && value < Number.MAX_SAFE_INTEGER;
}

/**
 * Determines whether the provided value is array-like.
 *
 * A value is considered array-like if it is not null or undefined, is object-like,
 * is not a function, has a 'length' property, and the length is a valid array length.
 * @param value - The value to check.
 * @returns True if the value is array-like, otherwise false.
 * @group Object
 * @category Type Guards
 * @example
 * ```typescript
 * isArrayLike([1, 2, 3]); // true
 * isArrayLike('hello'); // true
 * isArrayLike({ length: 2 }); // true
 * isArrayLike({}); // false
 * isArrayLike(() => {}); // false
 * isArrayLike(null); // false
 * ```
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
