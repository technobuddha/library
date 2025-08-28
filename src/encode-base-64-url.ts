import { type TextEncoding } from './@types/text-encoding.ts';
import { base64UrlConfig, encode } from './base64.ts';
import { type BinaryObject } from './binary-object.ts';
import { encodeText } from './encode-text.ts';
import { normalizeBinary } from './normalize-binary.ts';

// cspell:ignore Hdvcmxk AQID
/**
 * Convert a string to binary using {@link encodeText} with the supplied encoding, and then
 * encode it to `Base64Url`.
 * @param chars - The string to encode
 * @param encoding - The encoding of the input string
 * @returns An ASCII string containing the `Base64Url` representation
 * @example
 * ```typescript
 * encodeBase64Url('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ"
 * ```
 */
export function encodeBase64Url(chars: string, encoding: TextEncoding): string;
/**
 * Encode a {@link BinaryObject} to a `Base64Url` string.
 * @param binary - The Binary object to encode
 * @returns An ASCII string containing the `Base64Url` representation
 * @example
 * ```typescript
 * encodeBase64Url(new Uint8Array([1, 2, 3])); // "AQID"
 * ```
 */
export function encodeBase64Url(binary: BinaryObject): string;
/**
 * Creates a encoded ASCII string from a {@link BinaryObject} or `string` using
 * [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64).
 *
 * You can use this method to encode data which may otherwise cause communication problems,
 * transmit it, then use the {@link decodeBase64Url} method to decode the data again. For example, you can
 * encode control characters.
 * @group Encoding
 * @category Binary
 */
export function encodeBase64Url(arg: string | BinaryObject, encoding?: TextEncoding): string {
  return typeof arg === 'string' ?
      encode(base64UrlConfig, arg, encoding!)
    : encode(base64UrlConfig, normalizeBinary(arg));
}
