import { type BinaryObject } from './binary-object.ts';

/**
 * Normalizes {@link BinaryObject} to a `Uint8Array`.
 *
 * @param input - The {@link BinaryObject} to normalize.
 * @returns A `Uint8Array` representing the binary data.
 * @throws `TypeError` If the input is not a supported binary object type.
 * @example
 * ```typescript
 * normalizeBinary(new Uint8Array([1, 2, 3])); // Uint8Array([1, 2, 3])
 * normalizeBinary(new ArrayBuffer(3));        // Uint8Array([0, 0, 0])
 * normalizeBinary(new DataView(new Uint8Array([4, 5, 6]))); // Uint8Array([4, 5, 6])
 * normalizeBinary(new Float32Array([1, 2]));  // Uint8Array([...])
 * ```
 * @group Encoding
 * @category Binary
 */
export function normalizeBinary(input: BinaryObject): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  } else if (input instanceof ArrayBuffer) {
    return new Uint8Array(input);
  }
  return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
}
