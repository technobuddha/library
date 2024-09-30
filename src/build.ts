import { empty } from './constants';
import { compact } from 'lodash-es';
import { isString } from 'lodash-es';
import { isArray } from 'lodash-es';
import { isFunction } from 'lodash-es';

type stringy = string | string[] | IterableIterator<string>;
/**
 * Concatenates strings and/or arrays of strings
 *
 * @param args Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 */
export function build(...args: (stringy | Generator<stringy> | (() => stringy))[]): string {
  return compact(
    args.flatMap((a) =>
      isString(a) || isArray(a) ? a
      : isFunction(a) ? a()
      : Array.from(a),
    ),
  ).join(empty);
}

export default build;
