/**
 * A type that represents various binary object types in JavaScript.
 *
 * @group Encoding
 * @category Binary
 */
export type BinaryObject =
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float16Array
  | Float32Array
  | Float64Array;

/**
 * Normalizes various binary object types to a `Uint8Array`.
 *
 * Accepts an input of type `Uint8Array`, `ArrayBuffer`, or any ArrayBuffer view (e.g., `DataView`, `Int8Array`, etc.),
 * and returns a `Uint8Array` representation of the input. Throws a `TypeError` if the input is not a supported binary object type.
 *
 * @param input - The binary object to normalize. Can be a `Uint8Array`, `ArrayBuffer`, or any ArrayBuffer view.
 * @returns A `Uint8Array` representing the binary data.
 * @throws `TypeError` If the input is not a supported binary object type.
 * @group Encoding
 * @category Binary
 */
export function normalizeBinary(input: BinaryObject): Uint8Array {
  if (input instanceof Uint8Array) {
    return input;
  } else if (input instanceof ArrayBuffer) {
    return new Uint8Array(input);
  } else if (ArrayBuffer.isView(input)) {
    return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  }
  throw new TypeError('Unsupported binary object type');
}
