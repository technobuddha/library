import { type List } from '../array/list.ts';
import { toArray } from '../array/to-array.ts';
import { isIterable } from '../iteration/is-iterable.ts';

/**
 * Removes nullish values from an array or object.
 *
 * When given an array (or iterable), removes all `null` and `undefined` elements.
 *
 * When given an object, removes all properties whose value is `null`, `undefined`,
 * an empty array, or an empty object.
 *
 * @param array - The array or iterable to cull.
 * @returns An array containing only non-nullish elements.
 * @example
 * ```typescript
 * cull([1, null, 2, undefined, 3]);
 * //=> [1, 2, 3]
 * ```
 * @group Array
 * @category Filtering
 */
export function cull<L>(array: List<L | undefined | null>): L[];
/**
 * @param obj - The object to cull.
 * @returns A new object with nullish, empty-array, and empty-object properties removed.
 * @example
 * ```typescript
 * cull({ a: 1, b: null, c: [], d: {}, e: 'ok' });
 * //=> { a: 1, e: 'ok' }
 * ```
 */
export function cull<O extends object>(obj: O): O;

export function cull<O extends Record<K, unknown>, K extends string | number | symbol, L>(
  obj: List<L | undefined | null> | O,
): L[] | O {
  if (Array.isArray(obj) || isIterable(obj)) {
    return toArray(obj).filter((a) => a != null) as L[];
  }

  return Object.fromEntries(
    (Object.entries(obj as Record<string, O[keyof O]>) as [keyof O, O[keyof O]][]).filter(
      ([, value]) =>
        !(
          value == null ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
        ),
    ),
  ) as O;
}
