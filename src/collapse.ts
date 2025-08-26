import { type Primitive } from 'type-fest';

import { isFunction } from './is-function.ts';
import { isPrimitive } from './is-primitive.ts';

/**
 * Represents a primitive type that excludes `null` and `undefined`.
 * @see Primitive
 * @group Array
 * @category Methods
 */
export type CollapsiblePrimitive = Exclude<Primitive, null | undefined>;

/**
 * Represents a primitive value including `null` and `undefined`.
 * @typeParam T - The primitive type that can be collapsed.
 * @group Array
 * @category Methods
 */
export type CollapsibleValue<T extends CollapsiblePrimitive> =
  | T
  | null
  | undefined
  | (T | null | undefined)[];

/**
 * Represents a value that can be "collapsed" into a flat sequence of values of type `T`.
 *
 * A `Collapsible<T>` can be:
 * - A single value of type `T`
 * - `null` or `undefined`
 * - An array of values (and/or `null`/`undefined`)
 * - A function returning any of the above
 * - An iterable or generator yielding values (and/or `null`/`undefined`)
 *
 * This type is useful for APIs that accept flexible input forms, such as single values,
 * arrays, lazy generators, or functions producing values, and need to process them uniformly.
 *
 * @typeParam T - The primitive type that can be collapsed.
 * @group Array
 * @category Methods
 */
export type Collapsible<T extends CollapsiblePrimitive> =
  | CollapsibleValue<T>
  | (() => CollapsibleValue<T>[])
  | Iterable<CollapsibleValue<T>>
  | Generator<CollapsibleValue<T>>;

/**
 * Collapses an array of values into a flat array with `null` and `undefined` elements removed.
 *
 * Each argument can be:
 * - `T`
 * - `null`
 * - `undefined`
 * - a function returning `T` or `null` or `undefined` or an array
 * - A iterator returning `T` or `null` or `undefined`
 * - A generator returning `T` or `null` or `undefined`
 *
 * The function flattens all arguments, filters out `null`, and `undefined` values,
 * and returns the resulting array.
 *
 * @typeParam T - The primitive type that can be collapsed.
 * @param args - The values to collapse, which may be `T`, generators, iterables, or functions.
 * @returns An array of `T`, with all `null`, and `undefined` values removed.
 * @example
 * ```typescript
 * collapse(
 *   "hello",
 *   ["world", null, "foo"],
 *   function* () { yield "bar"; yield undefined; yield ["baz"]; },
 *   () => "qux",
 *   null,
 *   undefined
 * );
 * // Returns: ["hello", "world", "foo", "bar", "baz", "qux"]
 * ```
 * @group Array
 * @category Methods
 */
export function collapse<T extends CollapsiblePrimitive = string>(...args: Collapsible<T>[]): T[] {
  return args
    .flatMap((a) =>
      isPrimitive(a) || Array.isArray(a) ? a
      : isFunction(a) ? a()
      : (Array.from(a) as T[]),
    )
    .filter((a) => a != null) as T[];
}
