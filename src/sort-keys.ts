import { type JsonValue } from 'type-fest';

import { isPrimitive } from './is-primitive.ts';

/**
 * Recursively sorts the keys of an object in lexicographical order.
 *
 * If the input is a primitive value or an array, it is returned as-is.
 * For objects, all keys are sorted, and the function is applied recursively to all values.
 *
 * @typeParam T - The type of the input value, extending JsonValue.
 * @param object - The object or value whose keys should be sorted.
 * @returns A new object with keys sorted, or the original value if it is a primitive or array.
 */
export function sortKeys<T extends JsonValue>(object: T): T {
  if (isPrimitive(object)) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(sortKeys) as T;
  }

  return Object.fromEntries(
    Object.entries(object)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, sortKeys(v)]),
  ) as T;
}
