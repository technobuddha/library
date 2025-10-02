import { isFunction } from '../function/is-function.ts';

/**
 * Create a two dimensional array with all elements initialized
 * @remarks Array is accessed by
 * ```js
 * array[x][y][z]
 * ```
 * @example
 * ```typescript
 * create3DArray(2, 3, 4, 0);  // [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]
 * create3DArray(2, 3, 4, (x, y, z) => x + y + z); // [[[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5]], [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]]
 * ```
 * @typeParam T - Type of the elements in the array
 * @param width - Width of the array
 * @param height - Height of the array
 * @param depth - Depth of the array
 * @param fill - Value to fill the array, or a function returning the fill value for each element
 * @group Array
 * @category Construction
 */
export function create3dArray<T>(
  width: number,
  height: number,
  depth: number,
  fill: T | ((this: void, x: number, y: number, z: number) => T),
): T[][][] {
  if (isFunction(fill)) {
    return Array.from({ length: width }, (_1, x) =>
      Array.from({ length: height }, (_2, y) =>
        Array.from({ length: depth }, (_3, z) => fill(x, y, z)),
      ),
    );
  }

  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => Array.from({ length: depth }, () => fill)),
  );
}
