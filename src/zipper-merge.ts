/**
 * Merges multiple arrays into a single array by interleaving their elements at each index.
 *
 * Each element of the resulting array is an array containing the elements from the input arrays at
 * the corresponding index. If input arrays have different lengths, `undefined` will be used for
 * missing elements.
 *
 * @param arrays - The arrays to merge
 * @returns An array of arrays, where each inner array contains the elements from the input arrays
 * at the same index.
 *
 * @example
 * ```typescript
 * zipperMerge([1, 2, 3], ['a', 'b', 'c']);
 * // Returns: [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * zipperMerge([1, 2], ['a', 'b', 'c']);
 * // Returns: [[1, 'a'], [2, 'b'], [undefined, 'c']]
 * ```
 * @group Array
 * @category Methods
 */
export function zipperMerge<T extends unknown[][]>(
  ...arrays: T
): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const length = Math.max(...arrays.map((a) => a.length));
  const result: unknown[][] = [];
  for (let i = 0; i < length; i++) {
    result[i] = arrays.map((a) => a[i]);
  }
  return result as { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[];
}
