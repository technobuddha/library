/**
 * Represents a value that can be converted to an array.
 *
 * This type union allows for flexible input types that can be normalized to arrays:
 * - A single value of type T
 * - An array-like object (has length and indexed elements, like arguments or NodeList)
 * - An iterable object (has Symbol.iterator, like Set, Map, or Generator)
 *
 * @typeParam T - The type of elements in the resulting array
 *
 * @example
 * ```typescript
 * const singleValue: List<number> = 42;
 * const arrayLike: List<string> = { length: 2, 0: 'a', 1: 'b' };
 * const iterable: List<number> = new Set([1, 2, 3]);
 * const array: List<boolean> = [true, false];
 * ```
 *
 * @group Array
 * @category Types
 */
export type List<T> = T | ArrayLike<T> | Iterable<T>;
