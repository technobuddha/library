/**
 * Creates a new object with the specified properties omitted.
 *
 * @param obj - The object to omit properties from.
 * @param keys - The property keys to omit.
 * @returns A new object with the specified properties removed.
 *
 * @example
 * ```typescript
 * const obj = { x: 1, y: 2, z: 3 };
 * omitProperties(obj, 'x', 'y'); // { z: 3 }
 * ```
 *
 * @group Object
 * @category Manipulation
 */
export function omitProperties<T extends object, const K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}
