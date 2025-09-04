/**
 * Delete all own enumerable string properties from an object
 * @remarks The input argument is mutated in place
 * @typeParam T - Type of values within the object
 * @param input - Object to clear all properties
 * @returns Original input with all properties deleted.
 * @group Object
 * @category Mutation
 * @example
 * ```typescript
 * const obj = \{ a: 1, b: 2 \};
 * clear(obj); // obj is now \{\}
 * ```
 */
export function clear<T = unknown>(
  input: Record<string | number | symbol, T>,
): Record<string | number | symbol, T> {
  for (const key of Object.keys(input)) {
    delete input[key];
  }
  return input;
}
