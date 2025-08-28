/**
 * Determines if the provided object is iterable.
 *
 * Checks whether the given value is not `null` or `undefined` and has a `[Symbol.iterator]` method,
 * indicating that it implements the `Iterable` interface.
 * @param obj - The value to check for iterability.
 * @returns `true` if the object is iterable, otherwise `false`.
 * @example
 * ```typescript
 * isIterable([1, 2, 3]); // true
 * isIterable('hello');   // true
 * isIterable(new Map()); // true
 * isIterable(123);       // false
 * isIterable(null);      // false
 * ```
 * @group Object
 * @category Type Guards
 */
export function isIterable(obj: unknown): obj is Iterable<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return obj != null && typeof (obj as any)[Symbol.iterator] === 'function';
}
