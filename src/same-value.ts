/**
 * Determines whether two values are the same value, following the
 * [SameValue](https://tc39.es/ecma262/#sec-samevalue) algorithm as defined in ECMAScript.
 *
 * This function is similar to `Object.is`, handling special cases such as distinguishing
 * between `+0` and `-0`, and treating `NaN` as equal to itself.
 * @param x - The first value to compare.
 * @param y - The second value to compare.
 * @returns `true` if the values are the same according to the SameValue algorithm, otherwise `false`.
 * @group Object
 * @category Comparison
 */
export function sameValue(x: unknown, y: unknown): boolean {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / (y as number);
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
}
