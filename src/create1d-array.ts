import { isFunction } from './is-function.ts';

/**
 * Create a one dimensional array with all elements initialized
 * @example
 * ```typescript
 * create1DArray(3, 0);  // [0, 0, 0]
 * create1DArray(3, (x) => x); // [0, 1, 2]
 * ```
 * @typeParam T - Type of the elements in the array
 * @param length - Length of the array
 * @param fill - Value to fill the array, or a function returning the fill value for each element
 * @group Array
 * @category Construction
 */
export function create1dArray<T>(length: number, fill: T | ((x: number) => T)): T[] {
  if (isFunction(fill)) {
    return Array.from({ length }, (_1, i) => fill(i));
  }

  return Array.from({ length }, () => fill);
}
