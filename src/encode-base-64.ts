/* eslint-disable no-bitwise */
// cspell:ignore AQID theim Hdvcmxk

import { type TextEncoding } from './@types/text-encoding.ts';
import { base64Config, type Base64Configuration, base64UrlConfig } from './base64.ts';
import { empty } from './constants.ts';
import { encodeText } from './encode-text.ts';

/**
 * Gather 3 bytes from the input buffer and yield theim.
 * @param input - The input buffer
 * @returns A generator that yields the char codes of the characters in the input string
 */
function* pull3(input: Uint8Array): Generator<number[]> {
  let bytes: number[] = [];

  for (const i of input) {
    bytes.push(i);

    if (bytes.length === 3) {
      yield bytes;
      bytes = [];
    }
  }

  if (bytes.length > 0) {
    yield bytes;
  }
}

/**
 * Encodes binary data or a string into a Base64-encoded ASCII string using the specified character set configuration.
 *
 * @remarks
 * This internal function is used by {@link encodeBase64} and {@link encodeBase64Url} to perform the actual encoding logic.
 * If a string is provided, it is first converted to a `Uint8Array` using {@link encodeText} and the specified encoding.
 * The function processes the input in 3-byte blocks, encodes them into 4 Base64 characters, and applies padding as needed.
 *
 * @param charset - The Base64 alphabet and configuration to use for encoding.
 * @param arg - The input data to encode, either as a string or a `Uint8Array`.
 * @param encoding - (Optional) The text encoding to use if the input is a string. Defaults to 'utf8'.
 * @returns The Base64-encoded ASCII string.
 * @internal
 */
function encode(charset: Base64Configuration, chars: string, encoding: TextEncoding): string;
function encode(charset: Base64Configuration, binary: Uint8Array): string;
function encode(
  charset: Base64Configuration,
  arg: string | Uint8Array,
  encoding: TextEncoding = 'utf8',
): string {
  const input = typeof arg === 'string' ? encodeText(arg, encoding) : arg;
  const chars: string[] = [];
  const padding = (3 - (input.length % 3)) % 3; // determine the final padding

  for (const charCodes of pull3(input)) {
    const [c0, c1, c2] = charCodes;

    const bits = (c0 << 16) | (c1 << 8) | c2;
    chars.push(
      charset.alphabet.at((bits >>> 18) & 0x3f)!,
      charset.alphabet.at((bits >>> 12) & 0x3f)!,
      charset.alphabet.at((bits >>> 6) & 0x3f)!,
      charset.alphabet.at(bits & 0x3f)!,
    );
  }

  if (padding > 0) {
    for (let i = chars.length - padding; i < chars.length; ++i) {
      chars[i] = charset.padding;
    }
  }

  return chars.join(empty);
}

/**
 * Creates a Base64-encoded ASCII string from a string.
 *
 * You can use this method to encode data which may otherwise cause communication problems,
 * transmit it, then use the {@link decodeBase64} method to decode the data again. For example, you can
 * encode control characters such as ASCII values 0 through 31.
 *
 * Before encoding, the string is converted to binary using {@link encodeText} and the supplied ***encoding***
 *
 * @example
 * ```ts
 * encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
 * encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
 * ```
 *
 * @param chars - The string to encode
 * @param encoding - The encoding of the input string
 * @returns An ASCII string containing the Base64 representation
 * @group Encoding
 * @category Binary
 */
export function encodeBase64(chars: string, encoding: TextEncoding): string;
export function encodeBase64(binary: Uint8Array): string;
export function encodeBase64(arg: string | Uint8Array, encoding?: TextEncoding): string {
  return typeof arg === 'string' ? encode(base64Config, arg, encoding!) : encode(base64Config, arg);
}

/**
 * Creates a Base64-encoded ASCII string from a string.
 *
 * You can use this method to encode data which may otherwise cause communication problems,
 * transmit it, then use the {@link decodeBase64} method to decode the data again. For example, you can
 * encode control characters such as ASCII values 0 through 31.
 *
 * Before encoding, the string is converted to binary using {@link encodeText} and the supplied ***encoding***
 *
 * @example
 * ```ts
 * encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
 * encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
 * ```
 *
 * @param chars - The string to encode
 * @param encoding - The encoding of the input string
 * @returns An ASCII string containing the Base64 representation
 * @group Encoding
 * @category Binary
 */
export function encodeBase64Url(chars: string, encoding: TextEncoding): string;
export function encodeBase64Url(binary: Uint8Array): string;
export function encodeBase64Url(arg: string | Uint8Array, encoding?: TextEncoding): string {
  return typeof arg === 'string' ?
      encode(base64UrlConfig, arg, encoding!)
    : encode(base64UrlConfig, arg);
}
