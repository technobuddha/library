/**
 * Determines whether the provided object conforms to the Iterator interface.
 *
 * An object is considered an iterator if it is not `null` or `undefined` and has a `next` method of type `function`.
 * @param obj - The object to test for iterator compliance.
 * @returns `true` if the object is an iterator, otherwise `false`.
 * @example
 * ```typescript
 * const arr = [1, 2, 3];
 * const iter = arr[Symbol.iterator]();
 * isIterator(iter); // true
 * isIterator(arr);  // false
 * isIterator(null); // false
 * ```
 * @group Iteration
 * @category Type Checking
 */
export function isIterator(obj: unknown): obj is Iterator<unknown, unknown, unknown> {
  return obj != null && typeof obj === 'object' && 'next' in obj && typeof obj.next === 'function';
}
