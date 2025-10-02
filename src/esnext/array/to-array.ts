import { isIterable } from '../iteration/is-iterable.ts';

import { isArrayLike } from './is-array-like.ts';
import { type List } from './list.ts';

/**
 * Ensures that the provided value is returned as an array.
 *
 * If the value is already an array, it is returned as-is.
 * If the value is an iterable (like a Set, Map, or string), it is converted to an array.
 * If the value is array-like (has a length property and indexed elements), it is converted to an array.
 * Otherwise, the value is wrapped in a new array.
 *
 * Note: Strings are iterable in JavaScript and will be converted to arrays of characters.
 *
 * @typeParam T - The type of the value or array elements.
 * @param value - The value, array, iterable, or array-like object to convert to an array.
 * @returns An array containing the value(s).
 * @example
 * ```typescript
 * toArray(5); // [5]
 * toArray([1, 2, 3]); // [1, 2, 3]
 * toArray(new Set([1, 2, 3])); // [1, 2, 3]
 * toArray('hello'); // ['h', 'e', 'l', 'l', 'o']
 * toArray({ length: 3, 0: 'a', 1: 'b', 2: 'c' }); // ['a', 'b', 'c']
 * ```
 * @group Array
 * @category Conversion
 */
export function toArray<T>(value: List<T>): T[] {
  return (
    typeof value === 'string' ? [value]
    : Array.isArray(value) ? value
    : isIterable(value) || isArrayLike(value) ? Array.from(value)
    : [value]
  );
}
