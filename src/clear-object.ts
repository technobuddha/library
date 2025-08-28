/**
 * Delete all own enumerable string properties from an object
 * @remarks The input argument is mutated in place
 * @typeParam T - Type of values within the object
 * @param input - Object to clear all properties
 * @returns Original @see input with all properties deleted.
 * @group Object
 * @category Clear Object
 */
export function clearObject<T = unknown>(
  input: Record<string | number | symbol, T>,
): Record<string | number | symbol, T> {
  for (const key of Object.keys(input)) {
    delete input[key];
  }
  return input;
}
