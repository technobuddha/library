/**
 * A type that represents a value that can be either a single item, an array of items, or a readonly array of items.
 * This is useful for functions that accept flexible input formats.
 *
 * @typeParam T - The type of the item(s)
 *
 * @example
 * ```typescript
 * function process(input: Flexible<number>): number[] {
 *   return isArray(input) ? input : [input];
 * }
 *
 * process(5);           // [5]
 * process([1, 2, 3]);   // [1, 2, 3]
 * ```
 *
 * @group Array
 * @category Types
 */
export type Flexible<T> = T | T[] | readonly T[];
