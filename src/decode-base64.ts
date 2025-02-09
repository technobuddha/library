/* eslint-disable no-bitwise */
import { b64 } from './constants.js';
import { decodeText } from './decode-text.js';
import { type Encoding } from './encode-text.js';

/**
 * Gather 4 characters from the input string and yield their indices in the base64 alphabet.
 * Ignoring whitespace characters
 * @param input - The string to decode
 * @returns A generator that yields the indices of the characters in the base64 alphabet
 */
function* pull4(input: string): Generator<number[]> {
  let indices: number[] = [];

  for (const c of input) {
    if (c !== ' ' && c !== '\t' && c !== '\n' && c !== '\r' && c !== '\f' && c !== '\v') {
      if (indices.length === 4) {
        yield indices;
        indices = [];
      }

      const index = b64.indexOf(c);
      if (index === -1) {
        throw new TypeError('The string to be decoded is not correctly encoded.');
      }

      indices.push(b64.indexOf(c));
    }
  }

  while (indices.at(-1) === 64) {
    indices.length--;
  }

  if (indices.length > 0) {
    yield indices;
  }
}

/**
 * Decodes a string of data which has been encoded using
 * [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
 * You can use the btoa() method to encode and transmit data which may otherwise cause
 * communication problems, then transmit it and use the atob() method to decode the data again.
 * For example, you can encode, transmit, and decode control characters such as ASCII values
 * 0 through 31.
 *
 * @remarks Whitespace withing the Base64 encoded string is ignored.
 *
 * @example
 * ```typescript
 * atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
 * ```
 *
 * @param input - A string containing the Base64 encoded data to decode.
 * @returns An ASCII string containing decoded dat
 * @throws `TypeError` If the input string is not correctly encoded.
 */
export function decodeBase64(input: string): Uint8Array;
export function decodeBase64(input: string, encoding: Encoding): string;
export function decodeBase64(input: string, encoding?: Encoding): Uint8Array | string {
  const result: number[] = [];

  for (const [c0, c1, c2, c3] of pull4(input)) {
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
