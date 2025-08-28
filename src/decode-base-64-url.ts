import { type TextEncoding } from './@types/text-encoding.ts';
import { base64UrlConfig, decode } from './base64.ts';

// cspell:ignore Hdvcmxk
/**
 * Decode a [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoded string and
 * output in binary format.
 * @param input - A string containing the Base64 encoded data to decode.
 * @returns An `Uint8Array` containing the decoded data.
 * @example
 * ```typescript
 * decodeBase64('SGVsbG8sIHdvcmxkIQ==');
 * // Uint8Array([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33])
 * ```
 */
export function decodeBase64Url(input: string): Uint8Array;
/**
 * Decode a [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoded string as a
 * string with the specified text encoding.
 * @param input - A string containing the Base6Url encoded data to decode.
 * @param encoding - The text encoding to use for the decoded string.
 * @returns An `string` containing the decoded data.
 * @example
 * ```typescript
 * decodeBase64('SGVsbG8sIHdvcmxkIQ==', 'utf-8');
 * // "Hello, world!"
 * ```
 */
export function decodeBase64Url(input: string, encoding: TextEncoding): string;
/**
 * Decodes a string of data which has been encoded using
 * [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
 *
 * You can use the {@link encodeBase64Url} method to encode and transmit data which may otherwise cause
 * communication problems, then transmit it and use the `decodeBase64Url` method to decode the data again.
 * For example, you can encode, transmit, and decode control characters.
 * @remarks Whitespace within the Base64 encoded string is ignored.
 * @throws `TypeError` If the input string is not correctly encoded.
 * @group Encoding
 * @category Binary
 */
export function decodeBase64Url(input: string, encoding?: TextEncoding): Uint8Array | string {
  return encoding ? decode(base64UrlConfig, input, encoding) : decode(base64UrlConfig, input);
}
