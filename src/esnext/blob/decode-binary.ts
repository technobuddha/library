import { chunk } from '../tokenization/chunk.ts';

import { type BinaryEncoding } from './binary-encoding.ts';
import { decodeBase64 } from './decode-base64.ts';
import { decodeBase64Url } from './decode-base64-url.ts';

/**
 * Decode a string into a binary object
 *
 * The string can be in `base64`, `base64url`, `hex`, or `binary` {@link BinaryEncoding} format.
 *
 * - `base64`: The binary object was encoded via *base64*
 * - `base64url`: The binary object was encoded using *base64url*
 * - `hex`: each byte in the binary object was converted to a 2-digit hexadecimal number.
 * - `binary`: each byte in the binary object was converted to a single 8-bit character.
 * @param input - encoded binary object
 * @param encoding - The encoding to use
 * @returns encoded string
 * @example
 * ```typescript
 * decodeBinary('SGVsbG8=', 'base64');      // Uint8Array([72, 101, 108, 108, 111])
 * decodeBinary('SGVsbG8', 'base64url');    // Uint8Array([72, 101, 108, 108, 111])
 * decodeBinary('48656c6c6f', 'hex');       // Uint8Array([72, 101, 108, 108, 111])
 * decodeBinary('Hello', 'binary');         // Uint8Array([72, 101, 108, 108, 111])
 * ```
 * @group Serialization
 * @category Binary
 */
export function decodeBinary(input: string, encoding: BinaryEncoding): Uint8Array {
  switch (encoding) {
    case 'base64': {
      return decodeBase64(input);
    }

    case 'base64url': {
      return decodeBase64Url(input);
    }

    case 'hex': {
      return new Uint8Array(chunk(input, 2).map((hex) => Number.parseInt(hex, 16)));
    }

    case 'binary': {
      return Uint8Array.from(input, (char) => char.charCodeAt(0));
    }

    // no default
  }
}
