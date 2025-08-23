import { type StringLike } from './@types/string-like.ts';
import { empty } from './constants.ts';
import { isFunction } from './is-function.ts';
import { isString } from './is-string.ts';

/**
 * Collapses a list of arguments into a flat array of strings.
 *
 * Each argument can be:
 * - A string-like value (`StringLike`)
 * - A generator or iterable of string-like values
 * - A function returning a string-like value
 *
 * The function flattens all arguments, filters out `null` and `empty` values,
 * and returns the resulting array of strings.
 *
 * @param args - The values to collapse, which may be strings, generators, iterables, or functions.
 * @returns An array of strings, with all `null` and `empty` values removed.
 * @group Array
 * @category Collapse
 */
export function collapse(
  ...args: (StringLike | Generator<StringLike> | Iterable<StringLike> | (() => StringLike))[]
): string[] {
  return args
    .flatMap((a) =>
      isString(a) || a == null ? a
      : isFunction(a) ? a()
      : Array.from(a),
    )
    .filter((a) => a != null && a !== empty) as string[];
}
