import { isArrayLike } from '../array/is-array-like.ts';
import { isString } from '../string/is-string.ts';
import { empty } from '../unicode/unicode.ts';

import { type ObjectKey } from './object-key.ts';

/**
 * Parses a property path string or array into an array of path segments.
 *
 * - Supports dot notation (e.g., `"a.b.c"`).
 * - Supports bracket notation (e.g., `"a[0][b]"`).
 * - If an array is provided, it is returned unchanged.
 *
 * @param path - The property path as a string or array.
 * @returns An array of path segments.
 * @internal
 */
export function parsePath(path: ObjectKey | ArrayLike<ObjectKey>): ObjectKey[] {
  if (isString(path)) {
    return path
      .replace(/\]$/v, empty)
      .split(/\]\.|\]\[|\[|\./v)
      .filter((p) => p !== empty);
  }

  if (isArrayLike(path)) {
    return Array.from(path);
  }

  return [path];
}
