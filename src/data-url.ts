import { encodeBase64 } from './encode-base64.js';

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
  | Float32Array
  | Float64Array;

/**
 * Convert any binary object into a data URL
 *
 * @param input - The binary object
 * @param mimeType - The MIME type for the URL
 * @returns The data URL
 */
export function dataURL(input: BinaryObject, mimeType: string): string {
  const buffer = input instanceof ArrayBuffer ? input : input.buffer;
  const bytes = new Uint8Array(buffer);
  return `data:${mimeType};base64,${encodeBase64(bytes)}`;
}
