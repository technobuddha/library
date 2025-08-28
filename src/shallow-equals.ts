/**
 * Determines whether two values are the same value, following the
 * [SameValue](https://tc39.es/ecma262/#sec-samevalue) algorithm as defined in ECMAScript.
 *
 * This function is similar to `Object.is`, handling special cases such as distinguishing
 * between `+0` and `-0`, and treating `NaN` as equal to itself.
 *
 * @param x - The first value to compare.
 * @param y - The second value to compare.
 * @returns `true` if the values are the same according to the SameValue algorithm, otherwise `false`.
 * @internal
 */
function sameValue(x: unknown, y: unknown): boolean {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / (y as number);
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
}

/**
 * Compare two object for equality.  Testing goes one level deep.
 *
 * @param objA - First object to compare
 * @param objB - Second object to compare
 * @param exclude - Array of key names to exclude from the comparison
 * @returns true if the two objects have the same members
 * @group Object
 * @category Comparison
 */
export function shallowEquals(
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
    if (!Object.prototype.hasOwnProperty.call(objB, key) || !sameValue(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
