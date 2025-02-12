import { isFunction } from 'lodash-es';

/**
 * Create a two dimensional array with all elements initialized
 *
 * @remarks Array is accessed by array[w][h]
 * @example
 * ```ts
 * create2DArray(2, 3, 0);  // [[0, 0, 0], [0, 0, 0]]
 * ```
 *
 * @typeParam T - Type of the elements in the array
 * @param width - Width of the array
 * @param height - Height of the array
 * @param fill - value to fill the array, or a function returning the fill value for each element
 * @group Array
 * @category Create 2D Array
 */
export function create2DArray<T>(
  width: number,
  height: number,
  fill: T | ((x: number, y: number) => T),
): T[][] {
  if (isFunction(fill)) {
    return Array.from(Array.from({ length: width }), (_1, x) =>
      Array.from(Array.from({ length: height }), (_2, y) => fill(x, y)),
    );
  }

  return Array.from(Array.from({ length: width }), () =>
    Array.from({ length: height }).fill(fill),
  ) as T[][];
}
