/**
 * A type that represents various binary object types in JavaScript.
 * @see {@link dataURL}
 * @see {@link normalizeBinary}
 * @see {@link encodeBase64}
 * @see {@link encodeBase64Url}
 * @group Binary
 * @category Container
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
