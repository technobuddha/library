import { isArrayLike } from '../array/is-array-like.ts';
import { isFunction } from '../function/is-function.ts';
import { isPrimitive } from '../primitive/is-primitive.ts';
import { isStringLike } from '../string/is-string-like.ts';

/**
 * Options for controlling how nested empty arrays, objects, and strings are culled.
 * @group Object
 * @category Transform
 */
export type CullOptions = {
  /** Remove empty arrays that appear in nested arrays or objects. */
  emptyArrays?: boolean;
  /** Remove empty objects that appear in nested arrays or objects. */
  emptyObjects?: boolean;
  /** Remove empty string values from nested arrays and objects. */
  emptyStrings?: boolean;
};

function culler<O>(obj: O, options: CullOptions): O {
  const { emptyArrays = true, emptyObjects = true, emptyStrings = false } = options;

  if (emptyStrings && isStringLike(obj) && obj.length === 0) {
    return null as O;
  }

  if (obj == null || isPrimitive(obj) || isFunction(obj)) {
    return obj;
  }

  if (isArrayLike(obj)) {
    const culled = Array.from(obj, (item) => culler(item, options)).filter((item) => item != null);
    return (!emptyArrays || culled.length > 0 ? culled : null) as O;
  }

  const culled = Object.fromEntries(
    (Object.entries(obj as Record<string, O[keyof O]>) as [keyof O, O[keyof O]][])
      .map(([key, value]) => [key, culler(value, options)] as const)
      .filter(([, value]) => value != null),
  );

  return (!emptyObjects || Object.keys(culled).length > 0 ? culled : null) as O;
}

/**
 * Recursively removes nullish values from arrays and objects.
 *
 * Nested arrays and objects are culled depth-first, and any nested array or object that becomes
 * empty is removed from its parent.
 * Primitive values and functions are returned unchanged.
 * @param obj - The value to cull.
 * @param options - Controls whether empty nested arrays, objects, and strings are removed.
 * @returns A copy of the value with null and undefined entries removed.
 * @example
 * ```typescript
 * cull({ a: 1, b: null, c: [2, undefined, 3] });
 * //=> { a: 1, c: [2, 3] }
 * ```
 * @group Object
 * @category Transform
 */
export function cull<O>(obj: O, options: CullOptions = {}): O {
  if (obj == null || isPrimitive(obj) || isFunction(obj)) {
    return obj;
  }

  if (isArrayLike(obj)) {
    return Array.from(obj, (item) => culler(item, options)).filter((item) => item != null) as O;
  }

  return Object.fromEntries(
    (Object.entries(obj as Record<string, O[keyof O]>) as [keyof O, O[keyof O]][])
      .map(([key, value]) => [key, culler(value, options)] as const)
      .filter(([, value]) => value != null),
  ) as O;
}
