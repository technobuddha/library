import { type BinaryLike } from './binary-like.ts';
import { type BinaryObject } from './binary-object.ts';

/**
 * Converts a {@link BinaryObject} to a `Uint8Array` view.
 *
 * For `ArrayBuffer` inputs, creates a new `Uint8Array` view of the entire buffer.
 * For typed array or `DataView` inputs, creates a `Uint8Array` view that shares
 * the same underlying buffer, preserving the original offset and length.
 *
 * @param input - The {@link BinaryObject} to convert
 * @returns A `Uint8Array` view of the binary data
 *
 * @example
 * ```ts
 * // Convert ArrayBuffer to Uint8Array
 * const buffer = new ArrayBuffer(3);
 * toBinary(buffer); // Uint8Array([0, 0, 0])
 *
 * // Preserve existing Uint8Array
 * const arr = new Uint8Array([1, 2, 3]);
 * toBinary(arr) === arr; // true - returns same instance
 *
 * // Convert other typed arrays (shares buffer)
 * const int16 = new Int16Array([256, 257]);
 * toBinary(int16); // Uint8Array([0, 1, 1, 1]) - little-endian bytes
 *
 * // Handle views with offset
 * const view = new Uint8Array(buffer, 1, 2);
 * toBinary(view); // Uint8Array with correct offset preserved
 * ```
 *
 * @group Serialization
 * @category Binary
 */
export function toBinary(input: BinaryLike): Uint8Array {
  return ArrayBuffer.isView(input) ?
      new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
    : new Uint8Array(input);
}
