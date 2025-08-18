/* eslint-disable no-bitwise */
// cspell:ignore Hdvcmxk

import { type TextEncoding } from './@types/text-encoding.ts';
import { base64Config, type Base64Configuration, base64UrlConfig } from './base64.ts';
import { decodeText } from './decode-text.ts';

/**
 * Gather 4 characters from the input string and yield their indices in the base64 alphabet.
 * Ignoring whitespace characters
 * @param input - The string to decode
 * @returns A generator that yields the indices of the characters in the base64 alphabet
 * @internal
 */
function* pull4(input: string, charset: Base64Configuration): Generator<number[]> {
  let indices: number[] = [];

  for (const c of input) {
    if (c !== ' ' && c !== '\t' && c !== '\n' && c !== '\r' && c !== '\f' && c !== '\v') {
      if (indices.length === 4) {
        yield indices;
        indices = [];
      }

      if (c === charset.padding) {
        indices.push(-1);
      } else {
        const index = charset.alphabet.indexOf(c);
        if (index === -1) {
          throw new TypeError('The string to be decoded is not correctly encoded.');
        }

        indices.push(index);
      }
    }
  }

  while (indices.at(-1) === -1) {
    indices.length--;
  }

  if (indices.length > 0) {
    yield indices;
  }
}

/**
 * Decodes a Base64-encoded string using the specified character set configuration.
 *
 * @remarks
 * This function is used internally by {@link decodeBase64} and {@link decodeBase64Url}
 * to perform the actual decoding logic. It supports decoding to a `Uint8Array` or,
 * if an encoding is specified, to a decoded string using {@link decodeText}.
 *
 * Whitespace in the input string is ignored. If the input contains invalid Base64 characters,
 * a `TypeError` is thrown.
 *
 * @param charset - The Base64 alphabet and configuration to use for decoding.
 * @param input - The Base64-encoded string to decode.
 * @param encoding - (Optional) The text encoding to use for the output. If provided, the result is a string; otherwise, a `Uint8Array` is returned.
 * @returns The decoded data as a `Uint8Array` or a string, depending on the `encoding` parameter.
 * @throws {@link TypeError} If the input string contains invalid Base64 characters.
 * @internal
 */
function decode(charset: Base64Configuration, input: string): Uint8Array;
function decode(charset: Base64Configuration, input: string, encoding: TextEncoding): string;
function decode(
  charset: Base64Configuration,
  input: string,
  encoding?: TextEncoding,
): Uint8Array | string {
  const result: number[] = [];

  for (const [c0, c1, c2, c3] of pull4(input, charset)) {
    if (c2 == null) {
      result.push((c0 << 2) | (c1 >> 4));
    } else if (c3 == null) {
      result.push((c0 << 2) | (c1 >> 4), ((c1 & 0x0f) << 4) | (c2 >> 2));
    } else {
      result.push((c0 << 2) | (c1 >> 4), ((c1 & 0xf) << 4) | (c2 >> 2), ((c2 & 0x3) << 6) | c3);
    }
  }

  const ui8 = new Uint8Array(result);
  return encoding ? decodeText(ui8, encoding) : ui8;
}

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
 * @example
 * ```ts
 * atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
 * ```
 *
 * @param input - A string containing the Base64 encoded data to decode.
 * @returns An ASCII string containing decoded dat
 * @throws `TypeError` If the input string is not correctly encoded.
 * @group Encoding
 * @category Binary
 */
export function decodeBase64(input: string): Uint8Array;
export function decodeBase64(input: string, encoding: TextEncoding): string;
export function decodeBase64(input: string, encoding?: TextEncoding): Uint8Array | string {
  return encoding ? decode(base64Config, input, encoding) : decode(base64Config, input);
}

/**
 * Decodes a string of data which has been encoded using
 * [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
 * You can use the {@link encodeBase64Url} method to encode and transmit data which may otherwise cause
 * communication problems, then transmit it and use the `decodeBase64Url` method to decode the data again.
 * For example, you can encode, transmit, and decode control characters such as ASCII values
 * 0 through 31.
 *
 * @remarks Whitespace withing the Base64 encoded string is ignored.
 *
 * @example
 * ```ts
 * atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
 * ```
 *
 * @param input - A string containing the Base64 encoded data to decode.
 * @returns An ASCII string containing decoded dat
 * @throws `TypeError` If the input string is not correctly encoded.
 * @group Encoding
 * @category Binary
 */
export function decodeBase64Url(input: string): Uint8Array;
export function decodeBase64Url(input: string, encoding: TextEncoding): string;
export function decodeBase64Url(input: string, encoding?: TextEncoding): Uint8Array | string {
  return encoding ? decode(base64UrlConfig, input, encoding) : decode(base64UrlConfig, input);
}
