import { type BinaryEncoding } from './@types/binary-encoding.ts';
import { encodeBase64 } from './encode-base-64.ts';
import { encodeBase64Url } from './encode-base-64-url.ts';
import { empty } from './unicode.ts';

/**
 * Encode an {@link BinaryObject} into a string
 *
 * The string can be in `base64`, `base64url`, `hex`, or `binary` format.
 *
 * - `base64`: The binary object is encoded using {@link encodeBase64}
 * - `base64url`: The binary object is encoded using {@link encodeBase64Url}
 * - `hex`: each byte in the binary object is converted to a 2-digit hexadecimal number.
 * - `binary`: each byte in the binary object is converted to a 8-bit character.
 *
 * @param input - binary object
 * @param encoding - The encoding to use
 * @returns Encoded string
 * @example
 * ```typescript
 * encodeBinary(Uint8Array([72, 101, 108, 108, 111]), 'base64');    // 'SGVsbG8='
 * encodeBinary(Uint8Array([72, 101, 108, 108, 111]), 'base64url'); // 'SGVsbG8'
 * encodeBinary(Uint8Array([72, 101, 108, 108, 111]), 'hex');       // '48656c6c6f'
 * encodeBinary(Uint8Array([72, 101, 108, 108, 111]), 'binary');    // 'Hello'
 * ```
 * @remarks A string encoded in `binary` format may not be "well-formed"
 * @see [isWellFormed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/isWellFormed)
 * @group Encoding
 * @category Binary
 */
export function encodeBinary(input: Uint8Array, encoding: BinaryEncoding): string {
  switch (encoding) {
    case 'base64': {
      return encodeBase64(input);
    }

    case 'base64url': {
      return encodeBase64Url(input);
    }

    case 'hex': {
      return [...input].map((byte) => byte.toString(16).padStart(2, '0')).join(empty);
    }

    case 'binary': {
      // eslint-disable-next-line unicorn/prefer-code-point
      return String.fromCharCode(...input);
    }

    // no default
  }
}
