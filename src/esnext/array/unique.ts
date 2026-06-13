import { type List } from './list.ts';
import { toArray } from './to-array.ts';

/**
 * Returns a new list containing only unique elements from the input list.
 * If a transform function is provided, uniqueness is determined by the result of the transform.
 *
 * @param list - The list to filter for unique values.
 * @param transform - Optional function to transform each item for uniqueness comparison.
 * @returns A new list with unique elements.
 * @remarks
 * The list is returned in the original order, with duplicates removed.
 *
 * @example
 * ```typescript
 * unique([1, 2, 2, 3]); // [1, 2, 3]
 * unique([
 *   { id: 1, name: 'a' },
 *   { id: 2, name: 'b' },
 *   { id: 1, name: 'c' }
 * ], item => item.id); // [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
 * ```
 * @group Array
 * @category Filtering
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function unique<T, R>(list: T| List<T>, transform?: (item: T) => R): T[] {
  const array = toArray(list);
  if (transform) {
    return Array.from(new Map(array.map((item) => [transform(item), item])).values());
  }
  return Array.from(new Set(array));
}
