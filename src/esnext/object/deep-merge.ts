import { isArray } from '../array/is-array.ts';

import { isObject } from './is-object.ts';

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
export function deepMerge<T extends object>(
  main: T | undefined,
  ...obj: (object | undefined)[]
): T {
  const result = {} as T;

  for (const o of [main, ...obj]) {
    if (o != null) {
      for (const [key, value] of Object.entries(o) as [keyof T, T[keyof T]][]) {
        result[key] =
          isObject(value) && !isArray(value) && isObject(result[key]) && !isArray(result[key]) ?
            deepMerge(result[key], value)
          : value;
      }
    }
  }
  return result;
}
