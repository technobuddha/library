import { isArray } from '../array/is-array.ts';

import { isObject } from './is-object.ts';

/**
 * Recursively creates a deep copy of an object or array, preserving property descriptors and prototypes.
 *
 * @typeParam T - The type of the value to copy.
 * @param main - The value to deep copy (object, array, or primitive).
 * @returns A deep copy of the input value.
 *
 * @example
 * ```typescript
 * const original = { a: 1, b: { c: 2 } };
 * const copy = deepCopy(original);
 * copy.b.c = 3;
 * // original.b.c is still 2
 * ```
 *
 * @group Object
 * @category Copy
 */
export function deepCopy<T>(main: T): T {
  if (isArray(main)) {
    const result = Array.from({ length: main.length });

    for (const key of Reflect.ownKeys(main)) {
      const property = Object.getOwnPropertyDescriptor(main, key)!;
      Object.defineProperty(result, key, { ...property, value: deepCopy(property.value) });
    }

    return result as T;
  }

  if (isObject(main)) {
    const result = {} as T;

    for (const key of Reflect.ownKeys(main)) {
      const property = Object.getOwnPropertyDescriptor(main, key)!;
      Object.defineProperty(result, key, { ...property, value: deepCopy(property.value) });
    }

    Object.setPrototypeOf(result, Object.getPrototypeOf(main));
    return result;
  }

  return main;
}
