import { range } from '../array/range.ts';
import { decodeText } from '../unicode/decode-text.ts';
import { encodeText } from '../unicode/encode-text.ts';
import { type TextEncoding } from '../unicode/text-encoding.ts';
import { empty } from '../unicode/unicode.ts';

/**
 * Configuration for Base64 based encoding schemes
 * @internal
 */
type Base64Configuration = Readonly<{
  /**
   * An array of characters representing the Base64 alphabet to use for encoding and decoding.
   */
  alphabet: string[];
  /**
   * The character used for padding the encoded output (typically '=' in standard Base64).
   */
  padding: string;
}>;

/**
 * Configuration for Base64 encoding
 * @internal
 */
// prettier-ignore
export const base64Config: Base64Configuration = Object.freeze({
  alphabet: [...range('A', 'Z'), ...range('a', 'z'), ...range('0', '9'), '+', '/'],
  padding: '=',
});

/**
 * Configuration for Base64Url encoding
 * @internal
 */
// prettier-ignore
export const base64UrlConfig: Base64Configuration = Object.freeze({
  alphabet: [...range('A', 'Z'), ...range('a', 'z'), ...range('0', '9'), '-', '_'],
  padding: empty,
});

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
 * Decodes a Base64-encoded string into a text-encoded string.
 * @param charset - The Base64 alphabet and configuration to use for decoding.
 * @param input - The Base64-encoded string to decode.
 * @param encoding - The text encoding to use for the output.
 * @returns The decoded data as a string, encoded using the specified `encoding`.
 * @throws {@link TypeError} If the input string contains invalid Base64 characters.
 */
export function decode(charset: Base64Configuration, input: string): Uint8Array;
/**
 * Decodes a Base64-encoded string into a `Uint8Array`.
 * @param charset - The Base64 alphabet and configuration to use for decoding.
 * @param input - The Base64-encoded string to decode.
 * @returns The decoded data as a `Uint8Array`.
 * @throws {@link TypeError} If the input string contains invalid Base64 characters.
 */
export function decode(charset: Base64Configuration, input: string, encoding: TextEncoding): string;
/**
 * Decodes a Base64-encoded string using the specified character set configuration.
 * @remarks
 * This function is used internally by {@link decodeBase64} and {@link decodeBase64Url}
 * to perform the actual decoding logic. It supports decoding to a `Uint8Array` or,
 * if an encoding is specified, to a decoded string using {@link decodeText}.
 *
 * Whitespace in the input string is ignored. If the input contains invalid Base64 characters,
 * a `TypeError` is thrown.
 * @throws {@link TypeError} If the input string contains invalid Base64 characters.
 * @internal
 */
export function decode(
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
 * Gather 3 bytes from the input buffer and yield them.
 * @param input - The input buffer
 * @returns A generator that yields the char codes of the characters in the input string
 * @internal
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
 * Encodes a string into a Base64-encoded ASCII string.
 * @param charset - The Base64 alphabet and configuration to use for encoding.
 * @param chars - The input data to encode, either as a string or a `Uint8Array`.
 * @param encoding - (Optional) The text encoding to use if the input is a string. Defaults to 'utf-8'.
 * @returns The Base64-encoded ASCII string.
 */
export function encode(charset: Base64Configuration, chars: string, encoding: TextEncoding): string;
/**
 * Encodes binary data into a Base64-encoded ASCII string.
 * @param charset - The Base64 alphabet and configuration to use for encoding.
 * @param binary - The input data to encode, either as a string or a `Uint8Array`.
 * @returns The Base64-encoded ASCII string.
 */
export function encode(charset: Base64Configuration, binary: Uint8Array): string;
/**
 * Encodes binary data or a string into a Base64-encoded ASCII string using the specified character set configuration.
 * @remarks
 * This internal function is used by {@link encodeBase64} and {@link encodeBase64Url} to perform the actual encoding logic.
 * If a string is provided, it is first converted to a `Uint8Array` using {@link encodeText} and the specified encoding.
 * The function processes the input in 3-byte blocks, encodes them into 4 Base64 characters, and applies padding as needed.
 * @internal
 */
export function encode(
  charset: Base64Configuration,
  arg: string | Uint8Array,
  encoding: TextEncoding = 'utf-8',
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
