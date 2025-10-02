import { type Int } from '../binary/int.ts';

/**
 * Represents a value that can be converted to a number.
 *
 * This type includes:
 * - Native JavaScript `number` primitive
 * - Native JavaScript `bigint` primitive
 * - String representations of numbers
 * - Typed integer values (signed and unsigned 8, 16, 32, and 64-bit integers)
 *
 * @example
 * ```ts
 * const num: NumberLike = 42;
 * const big: NumberLike = 123n;
 * const str: NumberLike = "3.14";
 * ```
 *
 * @group Number
 * @category Types
 */
export type NumberLike = number | bigint | Int | Int<bigint>;
