import { type BinaryObject } from './binary-object.ts';
import { encodeBase64 } from './encode-base-64.ts';

/**
 * Convert any binary object into a data URL
 *
 * @param input - The binary object
 * @param mimeType - The MIME type for the URL
 * @returns The data URL
 * @example
 * ```typescript
 * const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
 * const url = dataURL(bytes, 'text/plain');
 * // url === "data:text/plain;base64,SGVsbG8="
 * ```
 * @group Encoding
 * @category Binary
 */
export function dataURL(input: BinaryObject, mimeType: string): string {
  const buffer = input instanceof ArrayBuffer ? input : input.buffer;
  const bytes = new Uint8Array(buffer);
  return `data:${mimeType};base64,${encodeBase64(bytes)}`;
}
