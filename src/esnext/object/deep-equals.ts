import { isPrimitive } from '../primitive/is-primitive.ts';

import { isMap } from './is-map.ts';
import { isSet } from './is-set.ts';
import { sameValue } from './same-value.ts';

/**
 * Compares two values for deep equality.
 *
 * Performs a recursive deep comparison of objects, arrays, maps, sets, and primitives.
 * For objects, all own properties (including symbol keys) are compared. Primitives are compared
 * using the SameValue algorithm.
 *
 * @param objA - First value to compare.
 * @param objB - Second value to compare.
 * @returns `true` if the values are deeply equal; otherwise, `false`.
 *
 * @example
 * ```typescript
 * deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
 * deepEquals({ a: 1, b: 2 }, { a: 1, b: 3 }); // false
 *
 * // Works with nested objects
 * deepEquals({ a: { b: 1 } }, { a: { b: 1 } }); // true
 *
 * // Works with maps and sets
 * deepEquals(new Map([['a', { value: 1 }]]), new Map([['a', { value: 1 }]])); // true
 * deepEquals(new Set([{ value: 1 }]), new Set([{ value: 1 }])); // true
 *
 * // Works with primitives
 * deepEquals(42, 42); // true
 * deepEquals('hello', 'world'); // false
 *
 * // Works with arrays
 * deepEquals([1, 2, 3], [1, 2, 3]); // true
 * ```
 *
 * @remarks
 * **Warning:** Circular references are not handled and will result in infinite recursion.
 *
 * @group Object
 * @category Comparison
 */
export function deepEquals(objA: unknown, objB: unknown): boolean {
  if (isPrimitive(objA)) {
    if (isPrimitive(objB)) {
      return sameValue(objA, objB);
    }
    return false;
  }

  if (isPrimitive(objB)) {
    return false;
  }

  if (isMap(objA)) {
    if (!isMap(objB) || objA.size !== objB.size) {
      return false;
    }

    const matchedEntries = new Set<number>();
    const entriesB = Array.from(objB);

    for (const [keyA, valueA] of objA) {
      let foundMatch = false;

      for (const [index, [keyB, valueB]] of entriesB.entries()) {
        if (matchedEntries.has(index)) {
          continue;
        }

        if (deepEquals(keyA, keyB) && deepEquals(valueA, valueB)) {
          matchedEntries.add(index);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        return false;
      }
    }

    return true;
  }

  if (isSet(objA)) {
    if (!isSet(objB) || objA.size !== objB.size) {
      return false;
    }

    const matchedEntries = new Set<number>();
    const valuesB = Array.from(objB);

    for (const valueA of objA) {
      let foundMatch = false;

      for (const [index, valueB] of valuesB.entries()) {
        if (matchedEntries.has(index)) {
          continue;
        }

        if (deepEquals(valueA, valueB)) {
          matchedEntries.add(index);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        return false;
      }
    }

    return true;
  }

  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.hasOwn(objB, key) || !deepEquals(Reflect.get(objA, key), Reflect.get(objB, key))) {
      return false;
    }
  }

  return true;
}
