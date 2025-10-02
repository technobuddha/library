import { type List } from './list.ts';
import { toArray } from './to-array.ts';

/**
 * Merges multiple lists into a single list by interleaving their elements at each index.
 *
 * Each element of the resulting list is an list containing the elements from the input lists at
 * the corresponding index. If input lists have different lengths, `undefined` will be used for
 * missing elements.
 * @param lists - The lists to merge
 * @returns An list of lists, where each inner list contains the elements from the input lists
 * at the same index.
 * @example
 * ```typescript
 * zipperMerge([1, 2, 3], ['a', 'b', 'c']);
 * // Returns: [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * zipperMerge([1, 2], ['a', 'b', 'c']);
 * // Returns: [[1, 'a'], [2, 'b'], [undefined, 'c']]
 * ```
 * @group Array
 * @category Merging
 */
export function* zipperMerge<T extends List<unknown>[]>(
  ...lists: T
): Generator<{ [K in keyof T]: T[K] extends (infer V)[] ? V : never }> {
  const arrays = lists.map((list) => toArray(list));
  const length = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < length; i++) {
    yield arrays.map((a) => a[i]) as { [K in keyof T]: T[K] extends (infer V)[] ? V : never };
  }
}
