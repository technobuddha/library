import { compact, isArray, isFunction, isString } from 'lodash-es';

import { empty } from './constants';

type Stringy = string | string[] | IterableIterator<string>;

/**
 * Concatenates strings and/or arrays of strings
 *
 * @param args Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 */
export function build(...args: (Stringy | Generator<Stringy> | (() => Stringy))[]): string {
  return compact(
    args.flatMap((a) =>
      isString(a) || isArray(a) ? a
      : isFunction(a) ? a()
      : [...a],
    ),
  ).join(empty);
}

export default build;
