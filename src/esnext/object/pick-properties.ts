/**
 * Creates a new object with only the specified properties.
 *
 * @param obj - The object to pick properties from.
 * @param keys - The property keys to include.
 * @returns A new object with only the specified properties.
 *
 * @example
 * ```typescript
 * const obj = { x: 1, y: 2, z: 3 };
 * pickProperties(obj, 'x', 'y'); // { x: 1, y: 2 }
 * ```
 *
 * @group Object
 * @category Manipulation
 */
export function pickProperties<T extends object, const K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key as K))) as Pick<
    T,
    K
  >;
}
