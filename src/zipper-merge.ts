export function zipperMerge<T1, T2>(a1: T1[], a2: T2[]): [T1 | undefined, T2 | undefined][];
export function zipperMerge<T1, T2, T3>(
  a1: T1[],
  a2: T2[],
  a3: T3[],
): [T1 | undefined, T2 | undefined, T3 | undefined][];
export function zipperMerge<T1, T2, T3, T4>(
  a1: T1[],
  a2: T2[],
  a3: T3[],
  a4: T4[],
): [T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined][];
export function zipperMerge<T1, T2, T3, T4, T5>(
  a1: T1[],
  a2: T2[],
  a3: T3[],
  a4: T4[],
  a5: T5[],
): [T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined, T5 | undefined][];
export function zipperMerge<T>(...a: T[][]): (T | undefined)[][];
/**
 * Merges multiple arrays into a single array by interleaving their elements at each index.
 * Each element of the resulting array is an array containing the elements from the input arrays at the corresponding index.
 * If input arrays have different lengths, `undefined` will be used for missing elements.
 *
 * @param arrays - The arrays to merge together.
 * @returns An array of arrays, where each inner array contains the elements from the input arrays at the same index.
 *
 * @example
 * ```typescript
 * zipperMerge([1, 2, 3], ['a', 'b', 'c']);
 * // Returns: [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * zipperMerge([1, 2], ['a', 'b', 'c']);
 * // Returns: [[1, 'a'], [2, 'b'], [undefined, 'c']]
 * ```
 *
 * @group Array
 * @category Merging
 */
export function zipperMerge(...arrays: unknown[][]): unknown[] {
  const length = Math.max(...arrays.map((a) => a.length));
  const result: unknown[][] = [];
  for (let i = 0; i < length; i++) {
    result[i] = arrays.map((a) => a[i]);
  }
  return result;
}
