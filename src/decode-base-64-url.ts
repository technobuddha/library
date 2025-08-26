import { type TextEncoding } from './@types/text-encoding.ts';
import { base64UrlConfig, decode } from './base64.ts';

// cspell:ignore Hdvcmxk
// eslint-disable-next-line no-secrets/no-secrets
/**
 * Decodes a string of data which has been encoded using
 * [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
 *
 * You can use the {@link encodeBase64Url} method to encode and transmit data which may otherwise cause
 * communication problems, then transmit it and use the `decodeBase64Url` method to decode the data again.
 * For example, you can encode, transmit, and decode control characters such as ASCII values
 * 0 through 31.
 * @remarks Whitespace within the Base64 encoded string is ignored.
 * @param input - A string containing the Base64 encoded data to decode.
 * @returns An ASCII string containing decoded dat
 * @throws `TypeError` If the input string is not correctly encoded.
 * @example
 * ```typescript
 * decodeBase64Url('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
 * ```
 * @group Encoding
 * @category Binary
 */
export function decodeBase64Url(input: string): Uint8Array;
export function decodeBase64Url(input: string, encoding: TextEncoding): string;
export function decodeBase64Url(input: string, encoding?: TextEncoding): Uint8Array | string {
  return encoding ? decode(base64UrlConfig, input, encoding) : decode(base64UrlConfig, input);
}
