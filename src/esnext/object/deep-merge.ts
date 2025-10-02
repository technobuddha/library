import { isObject } from './is-object.ts';
import { type ObjectLike } from './object-like.ts';

/**
 * Deeply merges multiple objects into a new object.
 *
 * - Only merges plain objects; arrays and other types are replaced, not merged.
 * - Properties from later objects overwrite those from earlier ones.
 *
 * @param main - The base object to merge into.
 * @param obj - Additional objects to merge.
 * @returns A new object containing the merged properties.
 *
 * @group Object
 * @category Merging
 */
export function deepMerge<T extends ObjectLike>(
  main: T | undefined,
  ...obj: (ObjectLike | undefined)[]
): T {
  const result = {} as T;

  for (const o of [main, ...obj]) {
    if (o != null) {
      for (const [key, value] of Object.entries(o) as [keyof T, T[keyof T]][]) {
        result[key] =
          (
            isObject(value) &&
            !Array.isArray(value) &&
            isObject(result[key]) &&
            !Array.isArray(result[key])
          ) ?
            (deepMerge(result[key] as ObjectLike, value as ObjectLike) as T[keyof T])
          : value;
      }
    }
  }
  return result;
}
