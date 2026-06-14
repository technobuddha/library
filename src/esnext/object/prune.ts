/**
 * @param obj - The object to cull.
 * @returns A new object with nullish, empty-array, and empty-object properties removed.
 * @example
 * ```typescript
 * cull({ a: 1, b: null, c: [], d: {}, e: 'ok' });
 * //=> { a: 1, e: 'ok' }
 * ```
 */
export function prune<O extends object>(obj: O): O {
  return Object.fromEntries(
    (Object.entries(obj as Record<string, O[keyof O]>) as [keyof O, O[keyof O]][]).filter(
      ([, value]) =>
        !(
          value == null ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
        ),
    ),
  ) as O;
}
