import { isIterable } from '../iteration/is-iterable.ts';
import { isString } from '../string/is-string.ts';

import { isArray } from './is-array.ts';
import { isArrayLike } from './is-array-like.ts';
import { type List } from './list.ts';

/**
 * Converts an {@link List} value into a generator that yields its elements.
 *
 * This function normalizes various input types (single values, arrays, array-like objects,
 * iterables) into a consistent generator interface. Special handling is provided for strings
 * to ensure they are yielded as a single value rather than being iterated character by character.
 *
 * @typeParam T - The type of elements to be yielded by the generator.
 *
 * @param value - The value to convert to an iterable. Can be:
 *   - A single value (yielded as-is)
 *   - A string (yielded as a single value, not split into characters)
 *   - An array-like object (elements yielded in index order)
 *   - An array or iterable (elements yielded in iteration order)
 * @returns A generator that yields the elements of the input value.
 *
 * @example
 * Convert a single value to an iterable:
 * ```ts
 * const result = Array.from(toIterable(42));
 * console.log(result);
 * // [42]
 * ```
 *
 * @example
 * Convert an array to an iterable:
 * ```ts
 * const result = Array.from(toIterable([1, 2, 3]));
 * console.log(result);
 * // [1, 2, 3]
 * ```
 *
 * @example
 * String is yielded as a single value:
 * ```ts
 * const result = Array.from(toIterable('hello'));
 * console.log(result);
 * // ['hello']  (not ['h', 'e', 'l', 'l', 'o'])
 * ```
 *
 * @example
 * Convert a Set to an iterable:
 * ```ts
 * const set = new Set([1, 2, 3]);
 * const result = Array.from(toIterable(set));
 * console.log(result);
 * // [1, 2, 3]
 * ```
 *
 * @example
 * Convert an array-like object to an iterable:
 * ```ts
 * const arrayLike = \{ length: 3, 0: 'a', 1: 'b', 2: 'c' \};
 * const result = Array.from(toIterable(arrayLike));
 * console.log(result);
 * // ['a', 'b', 'c']
 * ```
 *
 * @group Array
 * @category Conversion
 */
export function* toIterable<T>(value: T | List<T>): Generator<T> {
  if (isString(value)) {
    yield value;
  } else if (isArrayLike(value)) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < value.length; ++i) {
      yield value[i];
    }
  } else if (isArray<T>(value) || isIterable(value)) {
    yield* value;
  } else {
    yield value;
  }
}
