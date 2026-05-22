import { type Flexible } from '../array/flexible.ts';
import { lookAhead } from '../iteration/look-ahead.ts';
import { isNumeric } from '../number/is-numeric.ts';

import { isObject } from './is-object.ts';
import { type ObjectKey } from './object-key.ts';
import { parsePath } from './parse-path.ts';

/**
 * Sets the value at a given property path of an object, creating intermediate objects or arrays as needed.
 *
 * - Supports dot notation (e.g., `"a.b.c"`), bracket notation (e.g., `"a[0][b]"`), and array paths.
 * - Creates arrays for numeric keys and objects for non-numeric keys.
 * - Overwrites existing non-object intermediate values with arrays or objects as appropriate.
 * - Returns the original object after mutation.
 *
 * @param object - The object to modify.
 * @param path - The property path as a string or array.
 * @param value - The value to set at the specified path.
 * @returns The original object with the value set.
 *
 * @group Object
 * @category Manipulation
 */
export function set(
  object: object | ArrayLike<unknown>,
  path: Flexible<ObjectKey>,
  value: unknown,
): typeof object {
  let obj: object = object;

  const keys = parsePath(path);
  if (keys.length > 0) {
    for (const [key, next] of lookAhead(keys)) {
      if (Reflect.has(obj, key)) {
        const sub = Reflect.get(obj, key);
        if (isObject(sub) || Array.isArray(sub)) {
          obj = sub;
          continue;
        }
      }

      const insert: object = isNumeric(next) ? [] : {};
      Reflect.set(obj, key, insert);
      obj = insert;
    }

    Reflect.set(obj, keys.at(-1)!, value);
  }
  return object;
}
