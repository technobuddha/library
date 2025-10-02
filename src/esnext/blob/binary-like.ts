import { type BinaryObject } from './binary-object.ts';

/**
 * A type that represents any value that can be converted to binary data.
 * This includes all binary object types (ArrayBuffer, typed arrays, DataView)
 * as well as any array-like structure containing numbers.
 *
 * @example
 * ```ts
 * const buffer: Binaryable = new Uint8Array([1, 2, 3]);
 * const arrayLike: Binaryable = [255, 128, 64];
 * const dataView: Binaryable = new DataView(new ArrayBuffer(8));
 * ```
 *
 * @group Binary
 * @category Types
 */
export type BinaryLike = BinaryObject | ArrayLike<number>;
