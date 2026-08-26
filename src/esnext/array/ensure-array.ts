import { isString } from '../string/is-string.ts';

import { type Flexible } from './flexible.ts';
import { isArray } from './is-array.ts';
import { isArrayLike } from './is-array-like.ts';

/**
 * Ensures that a value is an array, wrapping it in an array if it is not already one.
 *
 * If the input is already an array, it is returned unchanged.
 * If the input is not an array, it is wrapped in a new array.
 *
 * @typeParam T - The type of the value or array elements.
 * @param value - The value to ensure is an array.
 * @returns The original array if the input was an array, or a new array containing the value.
 * @example
 * ```typescript
 * ensureArray(5); // [5]
 * ensureArray([1, 2, 3]); // [1, 2, 3]
 * ensureArray('hello'); // ['hello']
 * ensureArray({ key: 'value' }); // [{ key: 'value' }]
 * ```
 * @group Array
 * @category Conversion
 */
export function ensureArray<T>(value: Flexible<T>): readonly T[] {
  return (
    isArray(value) ? value
    : isString(value) ? [value]
    : isArrayLike(value) ? value
    : [value]
  );
}
