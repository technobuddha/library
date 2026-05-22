import { isPrimitive } from '../primitive/is-primitive.ts';
import { type Primitive } from '../primitive/primitive.ts';

import { sameValue } from './same-value.ts';

/**
 * Compares two values for shallow equality.
 *
 * Performs a one-level comparison of objects, arrays, and primitives. For objects and arrays, only own properties are compared
 * by reference using the SameValue algorithm (where NaN equals NaN, and -0 does not equal 0). Primitives are compared using SameValue.
 * Nested objects are compared by reference, not by their contents.
 *
 * @typeParam T - Type of the values being compared
 * @param objA - First value to compare
 * @param objB - Second value to compare
 * @param exclude - Array of property names (string or symbol) to exclude from the comparison
 * @returns `true` if the values are shallowly equal, `false` otherwise
 *
 * @example
 * ```typescript
 * const a = \{ x: 1, y: 2 \};
 * const b = \{ x: 1, y: 2 \};
 * shallowEquals(a, b); // true
 * shallowEquals(a, \{ x: 1 \}); // false
 * shallowEquals(a, \{ x: 1, y: 3 \}); // false
 * shallowEquals(a, b, ['y']); // true
 *
 * // Compares by reference, not by value
 * const nested1 = \{ obj: \{ value: 1 \} \};
 * const nested2 = \{ obj: \{ value: 1 \} \};
 * shallowEquals(nested1, nested2); // false (different object references)
 *
 * // Uses SameValue algorithm
 * shallowEquals(\{ q: Number.NaN \}, \{ q: Number.NaN \}); // true
 * shallowEquals(\{ q: 0 \}, \{ q: -0 \}); // false
 * ```
 *
 * @group Object
 * @category Comparison
 */
export function shallowEquals(
  objA: ArrayLike<unknown> | object | Primitive,
  objB: ArrayLike<unknown> | object | Primitive,
  exclude: (string | symbol)[] = [],
): boolean {
  if (isPrimitive(objA)) {
    if (isPrimitive(objB)) {
      return sameValue(objA, objB);
    }
    return false;
  }

  if (isPrimitive(objB)) {
    return false;
  }

  const hash = new Set<string | symbol>(exclude);
  const keysA = Reflect.ownKeys(objA).filter((key) => !hash.has(key));
  const keysB = Reflect.ownKeys(objB).filter((key) => !hash.has(key));

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.hasOwn(objB, key) || !sameValue(Reflect.get(objA, key), Reflect.get(objB, key))) {
      return false;
    }
  }

  return true;
}
