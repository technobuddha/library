/**
 * Returns the value it is given without transformation.
 *
 * Useful for passing a value through a callback pipeline or as a default identity function.
 * @param value - The value to return unchanged.
 * @returns The same value that was provided.
 * @example
 * ```typescript
 * identity('hello'); // 'hello'
 * identity({ answer: 42 }); // { answer: 42 }
 * ```
 * @group Function
 * @category Utilities
 */
export function identity<T>(value: T): T {
  return value;
}
