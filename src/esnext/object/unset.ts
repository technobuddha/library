import { type Flexible } from '../array/flexible.ts';
import { isArrayLike } from '../array/is-array-like.ts';

import { isObject } from './is-object.ts';
import { type ObjectKey } from './object-key.ts';
import { type ObjectLike } from './object-like.ts';
import { parsePath } from './parse-path.ts';

/**
 * Removes a property from an object at the specified path and returns the modified object.
 *
 * This function navigates through nested object properties using a dot-notation path
 * or an array of keys, and removes the property at the final key. If any intermediate
 * path does not exist or is not an object, the operation stops and returns the original object.
 *
 * @param object - The object to modify by removing a property
 * @param path - The path to the property to remove, either as a dot-notation string or array of keys
 * @returns The modified object with the property removed
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 'value' } }, x: 1 };
 *
 * // Remove nested property using dot notation
 * unset(obj, 'a.b.c');
 * // Result: { a: { b: {} }, x: 1 }
 *
 * // Remove property using array path
 * unset(obj, ['a', 'b']);
 * // Result: { a: {}, x: 1 }
 *
 * // Remove top-level property
 * unset(obj, 'x');
 * // Result: { a: { b: {} } }
 *
 * // Non-existent paths are safely ignored
 * unset(obj, 'nonexistent.path');
 * // Result: original object unchanged
 * ```
 *
 * @group Object
 * @category Manipulation
 */
export function unset(object: ObjectLike | ArrayLike<unknown>, path: Flexible<ObjectKey>): object {
  const keys = parsePath(path);
  let obj: object = object;

  if (keys.length > 0) {
    for (const key of keys.slice(0, -1)) {
      if (isObject(obj) || isArrayLike(obj)) {
        if (Reflect.has(obj, key)) {
          obj = Reflect.get(obj, key);
        } else {
          return object;
        }
      }
    }

    if (isObject(obj) || isArrayLike(obj)) {
      Reflect.deleteProperty(obj, keys.at(-1)!);
    }
  }

  return object;
}
