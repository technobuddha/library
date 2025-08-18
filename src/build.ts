import { compact, isArray, isFunction, isString } from 'lodash-es';

import { empty } from './constants.ts';

/**
 * A string-like object, which can be a string or an array of strings;
 *
 * @group String
 * @category Build
 */
export type StringLike = string | string[];
/**
 * Concatenates strings and/or arrays of strings
 *
 * @param args - Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 * @group String
 * @category Build
 */
export function build(
  ...args: (StringLike | Generator<string> | IterableIterator<string> | (() => StringLike))[]
): string {
  return compact(
    args.flatMap((a) =>
      isString(a) || isArray(a) ? a
      : isFunction(a) ? a()
      : Array.from(a),
    ),
  ).join(empty);
}
