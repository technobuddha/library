/**
 * Determines whether two values are the same type, following the
 * [SameValue](https://tc39.es/ecma262/#sec-sametype) algorithm as defined in ECMAScript.
 * @param x - The first value to compare.
 * @param y - The second value to compare.
 * @returns `true` if the values are the same type according to the SameType algorithm, otherwise `false`.
 * @group Object
 * @category Comparison
 */
export function sameType(x: unknown, y: unknown): boolean {
  return x === null || y === null ? x === y : typeof x === typeof y;
}
