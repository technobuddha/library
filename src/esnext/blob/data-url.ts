import { type BinaryLike } from './binary-like.ts';
import { encodeBase64 } from './encode-base64.ts';
import { toBinary } from './to-binary.ts';

/**
 * Convert any binary object into a data URL
 * @param input - The binary object
 * @param mimeType - The MIME type for the URL
 * @returns The data URL
 * @example
 * ```typescript
 * const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
 * dataURL(bytes, 'text/plain');
 * // url === "data:text/plain;base64,SGVsbG8="
 * ```
 * @group Serialization
 * @category Binary
 */
export function dataURL(input: BinaryLike, mimeType = 'text/plain'): string {
  return `data:${mimeType};base64,${encodeBase64(toBinary(input))}`;
}
