import { isPrimitive } from '../primitive/is-primitive.ts';
import { type Primitive } from '../primitive/primitive.ts';

import { type ObjectLike } from './object-like.ts';
import { sameValue } from './same-value.ts';

/**
 * Compares two values for deep equality.
 *
 * Performs a recursive deep comparison of objects, arrays, and primitives. For objects, all own properties
 * (including symbol keys) are compared. Primitives are compared using the SameValue algorithm.
 *
 * @param objA - First value to compare
 * @param objB - Second value to compare
 * @param exclude - Array of property names (string or symbol) to exclude from the comparison
 * @returns `true` if the values are deeply equal, `false` otherwise
 *
 * @example
 * ```typescript
 * deepEquals(\{ a: 1, b: 2 \}, \{ a: 1, b: 2 \}); // true
 * deepEquals(\{ a: 1, b: 2 \}, \{ a: 1, b: 3 \}); // false
 *
 * // Works with nested objects
 * deepEquals(\{ a: \{ b: 1 \} \}, \{ a: \{ b: 1 \} \}); // true
 *
 * // Works with primitives
 * deepEquals(42, 42); // true
 * deepEquals('hello', 'world'); // false
 *
 * // Works with arrays
 * deepEquals([1, 2, 3], [1, 2, 3]); // true
 *
 * // Can exclude specific keys
 * deepEquals(\{ a: 1, b: 2 \}, \{ a: 1, b: 3 \}, ['b']); // true
 * ```
 *
 * @remarks
 * **Warning:** Circular references are not handled and will result in infinite recursion.
 *
 * @group Object
 * @category Comparison
 */
export function deepEquals(
  objA: ArrayLike<unknown> | ObjectLike | Primitive,
  objB: ArrayLike<unknown> | ObjectLike | Primitive,
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
    if (
      !Object.hasOwn(objB, key) ||
      !deepEquals(Reflect.get(objA, key), Reflect.get(objB, key), exclude)
    ) {
      return false;
    }
  }

  return true;
}
