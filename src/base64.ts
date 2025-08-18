import { empty } from './constants.ts';

/**
 * Configuration for Base64 based encoding schemes
 *
 * @internal
 */
/**
 * Configuration options for Base64 encoding and decoding.
 */
export type Base64Configuration = Readonly<{
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
  alphabet: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '/',
  ],
  padding: '=',
});

/**
 * Configuration for Base64Url encoding
 * @internal
 */
// prettier-ignore
export const base64UrlConfig: Base64Configuration = Object.freeze({
  alphabet: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '-', '_',
  ],
  padding: empty,
});
