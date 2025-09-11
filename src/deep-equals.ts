import { sameValue } from './same-value.ts';

/**
 * Compare two object for equality.
 *
 * ::: warning
 * Circular references are not handled, resulting in infinite recursion.
 * :::
 *
 * @param objA - First object to compare
 * @param objB - Second object to compare
 * @param exclude - Array of key names to exclude from the comparison
 * @returns true if the two objects have the same members
 * @group Object
 * @category Comparison
 */
export function deepEquals(
  objA: Record<string, unknown> | null | undefined,
  objB: Record<string, unknown> | null | undefined,
  exclude: string[] = [],
): boolean {
  if (sameValue(objA, objB)) {
    return true;
  }

  if (objA === null || objA === undefined || objB === null || objB === undefined) {
    return false;
  }

  const hash = new Set(exclude);

  const keysA = Object.keys(objA).filter((key) => !hash.has(key));
  const keysB = Object.keys(objB).filter((key) => !hash.has(key));

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (Object.prototype.hasOwnProperty.call(objB, key)) {
      if (typeof objA[key] === 'object' || typeof objB[key] === 'object') {
        return deepEquals(
          objA[key] as Record<string, unknown>,
          objB[key] as Record<string, unknown>,
          exclude,
        );
      }
      if (!sameValue(objA[key], objB[key])) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}
