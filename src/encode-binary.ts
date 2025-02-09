import { encodeBase64 } from './encode-base64.js';

export type BinaryEncoding = 'base64' | 'base64url' | 'hex' | 'binary';

/**
 * Encode an binary object into a string
 *
 * The string can be in *base64*, *base64url*, *hex*, or *binary* format.
 *
 * base64 or base64url: The binary object is encoded using {@link encodeBase64}
 * hex: each byte in the binary object is converted to a series of 2-digit hexadecimal numbers
 * binary: each byte in the binary object is converted to a characters
 *
 * @param input - binary object
 * @param encoding - The encoding to use
 * @returns encoded string
 */
export function encodeBinary(input: Uint8Array, encoding: BinaryEncoding): string {
  switch (encoding) {
    case 'base64': {
      return encodeBase64(input);
    }

    case 'base64url': {
      throw new Error('Not implemented');
    }

    case 'hex': {
      return [...input].map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    case 'binary': {
      // eslint-disable-next-line unicorn/prefer-code-point
      return String.fromCharCode(...input);
    }

    // no default
  }
}
