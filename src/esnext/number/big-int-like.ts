import { type Int } from '../binary/int.ts';

/**
 * Represents a value that can be converted to a bigint.
 *
 * This type includes:
 * - Native JavaScript `number` primitive
 * - Native JavaScript `bigint` primitive
 * - String representations of integers
 * - Typed integer values (signed and unsigned 8, 16, 32, and 64-bit integers)
 *
 * @example
 * ```ts
 * const big: BigIntLike = 42n;
 * const num: BigIntLike = 123;
 * const str: BigIntLike = "9007199254740991";
 * ```
 *
 * @group Number
 * @category Conversion
 */
export type BigIntLike = number | bigint | Int | Int<bigint>;
