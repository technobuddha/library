/* eslint-disable no-bitwise */
import { base64Charset, base64UrlCharset, type BaseCharset } from './constants.js';
import { encodeText, type Encoding } from './encode-text.js';

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
function encode(charset: BaseCharset, chars: string, encoding: Encoding): string;
function encode(charset: BaseCharset, binary: Uint8Array): string;
function encode(
  charset: BaseCharset,
  arg: string | Uint8Array,
  encoding: Encoding = 'utf8',
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

  return chars.join('');
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
 * ```typescript
 * encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
 * ```
 *
 * @param chars - The string to encode
 * @param encoding - The encoding of the input string
 * @returns An ASCII string containing the Base64 representation
 */
export function encodeBase64(chars: string, encoding: Encoding): string;
/**
 * Creates a Base64-encoded ASCII string from a binary source.
 *
 * You can use this method to encode data which may otherwise cause communication problems,
 * transmit it, then use the {@link decodeBase64} method to decode the data again. For example, you can
 * encode control characters such as ASCII values 0 through 31.
 *
 * @example
 * ```typescript
 * encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
 * ```
 * @param binary - The *binary data* to encode
 * @returns An ASCII string containing the Base64 representation
 */
export function encodeBase64(binary: Uint8Array): string;
export function encodeBase64(arg: string | Uint8Array, encoding?: Encoding): string {
  return typeof arg === 'string' ?
      encode(base64Charset, arg, encoding!)
    : encode(base64Charset, arg);
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
 * ```typescript
 * encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
 * ```
 *
 * @param chars - The string to encode
 * @param encoding - The encoding of the input string
 * @returns An ASCII string containing the Base64 representation
 */
export function encodeBase64Url(chars: string, encoding: Encoding): string;
/**
 * Creates a Base64-encoded ASCII string from a binary source.
 *
 * You can use this method to encode data which may otherwise cause communication problems,
 * transmit it, then use the {@link decodeBase64} method to decode the data again. For example, you can
 * encode control characters such as ASCII values 0 through 31.
 *
 * @example
 * ```typescript
 * encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
 * ```
 * @param binary - The *binary data* to encode
 * @returns An ASCII string containing the Base64 representation
 */
export function encodeBase64Url(binary: Uint8Array): string;
export function encodeBase64Url(arg: string | Uint8Array, encoding?: Encoding): string {
  return typeof arg === 'string' ?
      encode(base64UrlCharset, arg, encoding!)
    : encode(base64UrlCharset, arg);
}
