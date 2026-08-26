import { isArray } from '../array/is-array.ts';
import { isObject } from '../object/is-object.ts';

import { type StringLike } from './string-like.ts';

/**
 * Checks whether a value is string-like.
 *
 * A value is considered string-like when it is either a primitive string or a `String` object.
 * All other values—including arrays, plain objects, dates, regular expressions, and functions—return `false`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a primitive string or a `String` object; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isStringLike('hello'); // true
 * isStringLike(new String('hello')); // true
 * isStringLike({ toString: () => 'x' }); // false
 * isStringLike([1, 2, 3]); // false
 * isStringLike(new Date()); // false
 * isStringLike(/re/); // false
 * isStringLike(42); // false
 * ```
 *
 * @group String
 * @category Type Guards
 */
export function isStringLike(value: unknown): value is StringLike {
  return (
    typeof value === 'string' ||
    (!isArray(value) &&
      isObject(value) &&
      Object.prototype.toString.call(value) === '[object String]')
  );
}
