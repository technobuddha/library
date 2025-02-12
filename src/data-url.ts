import { type BinaryObject } from './binary-object.js';
import { encodeBase64 } from './encode-base64.js';

/**
 * Convert any binary object into a data URL
 *
 * @param input - The binary object
 * @param mimeType - The MIME type for the URL
 * @returns The data URL
 * @group Encoding
 * @category Data URL
 */
export function dataURL(input: BinaryObject, mimeType: string): string {
  const buffer = input instanceof ArrayBuffer ? input : input.buffer;
  const bytes = new Uint8Array(buffer);
  return `data:${mimeType};base64,${encodeBase64(bytes)}`;
}
