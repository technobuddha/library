import { type List } from './list.ts';
import { toArray } from './to-array.ts';

/**
 * Removes all `null` and `undefined` values from the provided array.
 *
 * @param array - The array to filter.
 * @returns An array containing only non-null and non-undefined values.
 *
 * @group Array
 * @category Filtering
 */
export function* cull<T>(array: List<T | undefined | null>): Generator<T> {
  yield* toArray(array).filter((a) => a != null) as T[];
}
