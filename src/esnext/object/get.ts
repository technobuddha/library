import { type Flexible } from '../array/flexible.ts';

import { isObject } from './is-object.ts';
import { type ObjectKey } from './object-key.ts';
import { parsePath } from './parse-path.ts';

/**
 * Retrieves the value at a given property path of an object.
 *
 * - Supports dot notation (e.g., `"a.b.c"`), bracket notation (e.g., `"a[0][b]"`), and array paths.
 * - Returns `undefined` if the path does not exist.
 *
 * @param object - The object to query.
 * @param path - The property path as a string or array.
 * @returns The value at the specified path, or `undefined` if not found.
 *
 * @group Object
 * @category Manipulation
 */
export function get(object: object | ArrayLike<unknown>, path: Flexible<ObjectKey>): unknown {
  let obj: unknown = object;
  for (const key of parsePath(path)) {
    if (isObject(obj) || Array.isArray(obj)) {
      obj = Reflect.get(obj, key);
    } else {
      obj = undefined;
      break;
    }
  }
  return obj;
}
