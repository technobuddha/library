import { isArrayLike } from '../array/is-array-like.ts';
import { isFunction } from '../function/is-function.ts';
import { isPrimitive } from '../primitive/is-primitive.ts';

function culler<O>(obj: O): O {
  if (obj == null || isPrimitive(obj) || isFunction(obj)) {
    return obj;
  }

  if (isArrayLike(obj)) {
    const culled = Array.from(obj)
      .map(culler)
      .filter((item) => item != null);
    return (culled.length > 0 ? culled : null) as O;
  }

  const culled = Object.fromEntries(
    (Object.entries(obj as Record<string, O[keyof O]>) as [keyof O, O[keyof O]][])
      .map(([key, value]) => [key, culler(value)] as const)
      .filter(([, value]) => value != null),
  );

  return (Object.keys(culled).length > 0 ? culled : null) as O;
}

/**
 * Recursively removes nullish values from arrays and objects.
 *
 * Nested arrays and objects are culled depth-first, and any nested array or object that becomes
 * empty is removed from its parent.
 * Primitive values and functions are returned unchanged.
 * @param obj - The value to cull.
 * @returns A copy of the value with null and undefined entries removed.
 * @example
 * ```typescript
 * cull({ a: 1, b: null, c: [2, undefined, 3] });
 * //=> { a: 1, c: [2, 3] }
 * ```
 * @group Object
 * @category Transform
 */
export function cull<O>(obj: O): O {
  if (obj == null || isPrimitive(obj) || isFunction(obj)) {
    return obj;
  }

  if (isArrayLike(obj)) {
    return Array.from(obj)
      .map(culler)
      .filter((item) => item != null) as O;
  }

  return Object.fromEntries(
    (Object.entries(obj as Record<string, O[keyof O]>) as [keyof O, O[keyof O]][])
      .map(([key, value]) => [key, culler(value)] as const)
      .filter(([, value]) => value != null),
  ) as O;
}
