import { type ObjectLike } from './object-like.ts';

/**
 * Removes all own enumerable properties from an object.
 *
 * Mutates the input argument in place, all own properties (including symbol keys) are deleted.
 * @typeParam T - Type of the input (object)
 * @param input - The object to clear
 * @returns The original input, now empty
 *
 * @example
 * ```typescript
 * const obj = \{ a: 1, b: 2 \};
 * clear(obj); // obj is now \{\}
 * ```
 */
export function clear<T extends ObjectLike>(input: T): T;
/**
 * Removes all own enumerable properties from an object.
 *
 * Mutates the input argument in place, all elements are removed.
 * @typeParam T - Type of the input (array)
 * @param input - The array to clear
 * @returns The original input, now empty
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3];
 * clear(arr); // arr is now []
 * ```
 */
export function clear<T extends unknown[]>(input: T): T;
/**
 * Remove all values from an object or array.
 * @group Object
 * @category Mutation
 */
export function clear<T extends ObjectLike | unknown[]>(input: T): T {
  if (Array.isArray(input)) {
    input.length = 0;
    return input;
  }
  for (const key of Reflect.ownKeys(input)) {
    delete input[key];
  }
  return input;
}
