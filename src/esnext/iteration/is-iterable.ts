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
 * @group Iteration
 * @category Type Checking
 */
export function isIterable(obj: unknown): obj is Iterable<unknown> {
  return (
    typeof obj === 'string' ||
    (obj != null &&
      typeof obj === 'object' &&
      // eslint-disable-next-line unicorn/no-computed-property-existence-check
      Symbol.iterator in obj &&
      typeof obj[Symbol.iterator] === 'function')
  );
}
