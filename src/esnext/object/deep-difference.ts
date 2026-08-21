import { isPrimitive } from '../primitive/is-primitive.ts';

import { isMap } from './is-map.ts';
import { isSet } from './is-set.ts';
import { sameValue } from './same-value.ts';

/**
 * Finds the first property name that differs between two values.
 *
 * This function walks the values in the same way as deep equality, but returns the
 * first key name that is different instead of a boolean. If the values are deeply equal,
 * it returns `null`.
 *
 * @param objA - First value to compare.
 * @param objB - Second value to compare.
 * @returns The first differing property name, or `null` if the values are equal.
 *
 * @example
 * ```typescript
 * deepDifference({ a: 1, b: 2 }, { a: 1, b: 3 }); // 'b'
 * deepDifference({ a: { b: 1 } }, { a: { b: 2 } }); // 'a.b'
 * deepDifference({ a: 1 }, { a: 1 }); // null
 * ```
 *
 * @group Object
 * @category Comparison
 */
export function deepDifference(objA: unknown, objB: unknown, path: string[] = []): string | null {
  if (isPrimitive(objA)) {
    if (isPrimitive(objB)) {
      return sameValue(objA, objB) ? null : path.join('.');
    }
    return path.join('.');
  }

  if (isPrimitive(objB)) {
    return path.join('.');
  }

  if (isMap(objA)) {
    if (!isMap(objB) || objA.size !== objB.size) {
      return path.join('.') || 'value';
    }

    const matchedEntries = new Set<number>();
    const entriesB = Array.from(objB);

    for (const [keyA, valueA] of objA) {
      let foundMatch = false;

      for (const [index, [keyB, valueB]] of entriesB.entries()) {
        if (matchedEntries.has(index)) {
          continue;
        }

        const nestedPath = [...path, String(keyA)];

        if (
          deepDifference(keyA, keyB, nestedPath) === null &&
          deepDifference(valueA, valueB, nestedPath) === null
        ) {
          matchedEntries.add(index);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        return path.join('.') || 'value';
      }
    }

    return null;
  }

  if (isSet(objA)) {
    if (!isSet(objB) || objA.size !== objB.size) {
      return path.join('.') || 'value';
    }

    const matchedEntries = new Set<number>();
    const valuesB = Array.from(objB);

    for (const valueA of objA) {
      let foundMatch = false;

      for (const [index, valueB] of valuesB.entries()) {
        if (matchedEntries.has(index)) {
          continue;
        }

        if (deepDifference(valueA, valueB, path) === null) {
          matchedEntries.add(index);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        return path.join('.') || 'value';
      }
    }

    return null;
  }

  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) {
    return path.join('.') || 'value';
  }

  for (const key of keysA) {
    if (!Object.hasOwn(objB, key)) {
      return [...path, String(key)].join('.');
    }

    const valueA = Reflect.get(objA, key);
    const valueB = Reflect.get(objB, key);
    const nextPath = [...path, String(key)];

    const nestedDifference = deepDifference(valueA, valueB, nextPath);
    if (nestedDifference === null) {
      continue;
    }

    return nestedDifference;
  }

  return null;
}
