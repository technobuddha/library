import { type TextEncoding } from './@types/text-encoding.ts';
import { base64Config, decode } from './base64.ts';

// cspell:ignore Hdvcmxk
/**
 * Decodes a string of data which has been encoded using
 * [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
 *
 * You can use the **decodeBase64** method to encode and transmit data which may otherwise cause
 * communication problems, then transmit it and use the {@link encodeBase64} method to decode the data again.
 * For example, you can encode, transmit, and decode control characters such as ASCII values
 * 0 through 31.
 *
 * @remarks Whitespace withing the Base64 encoded string is ignored.
 *
 * @param input - A string containing the Base64 encoded data to decode.
 * @returns An ASCII string containing decoded dat
 * @throws `TypeError` If the input string is not correctly encoded.
 * @example
 * ```typescript
 * decodeBase64('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
 * ```
 *  @group Encoding
 * @category Binary
 */
export function decodeBase64(input: string): Uint8Array;
export function decodeBase64(input: string, encoding: TextEncoding): string;
export function decodeBase64(input: string, encoding?: TextEncoding): Uint8Array | string {
  return encoding ? decode(base64Config, input, encoding) : decode(base64Config, input);
}
