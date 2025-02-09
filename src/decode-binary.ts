import { chop } from './chop.js';
import { decodeBase64 } from './decode-base64.js';
import { type BinaryEncoding } from './encode-binary.js';

/**
 * Decode a string into a binary object
 *
 * The string can be in *base64*, *base64url*, *hex*, or *binary* format.
 *
 * base64 or base64url: The binary object was encoded using {@link encodeBase64}
 * hex: each byte in the binary object is converted to a series of 2-digit hexadecimal numbers
 * binary: each byte in the binary object is converted to a characters
 *
 * @param input - binary object
 * @param encoding - The encoding to use
 * @returns encoded string
 */
export function decodeBinary(input: string, encoding: BinaryEncoding): Uint8Array {
  switch (encoding) {
    case 'base64': {
      return decodeBase64(input);
    }

    case 'base64url': {
      throw new Error('Not implemented');
    }

    case 'hex': {
      // TODO [2025-02-11]: this is not validating the input
      return new Uint8Array(chop(input, 2).map((hex) => Number.parseInt(hex, 16)));
    }

    case 'binary': {
      // eslint-disable-next-line unicorn/prefer-code-point
      return Uint8Array.from(input, (char) => char.charCodeAt(0));
    }

    // no default
  }
}
