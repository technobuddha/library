import { isDate } from './is-date.ts';
import { isPrimitive } from './is-primitive.ts';
import { isRegExp } from './is-reg-exp.ts';
import { type TBJsonValue } from './json.ts';

/**
 * Recursively sorts the keys of an object in lexicographical order.
 *
 * If the input is a primitive value or an array, it is returned as-is.
 * For objects, all keys are sorted, and the function is applied recursively to all values.
 * @typeParam T - The type of the input value, extending JsonValue.
 * @param object - The object or value whose keys should be sorted.
 * @returns A new object with keys sorted, or the original value if it is a primitive or array.
 * @group Object
 * @category Operations
 * @example
 * ```typescript
 * sortKeys(\{ b: 2, a: 1 \}); // returns \{ a: 1, b: 2 \}
 * sortKeys(\{ z: 1, y: \{ b: 2, a: 1 \} \}); // returns \{ y: \{ a: 1, b: 2 \}, z: 1 \}
 * sortKeys([\{ b: 2, a: 1 \}, \{ d: 4, c: 3 \}]); // returns [\{ a: 1, b: 2 \}, \{ c: 3, d: 4 \}]
 * sortKeys(42); // returns 42
 * ```
 */
export function sortKeys<T extends TBJsonValue>(object: T): T {
  if (isPrimitive(object) || isDate(object) || isRegExp(object)) {
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
