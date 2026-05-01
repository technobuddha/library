import { charToInteger } from './vlq.ts';

// eslint-disable-next-line no-secrets/no-secrets
/**
 * Decodes a [Base64 VLQ](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit)
 * encoded string into an array of integers.
 *
 * Base64 VLQ encoding is used in source maps to efficiently represent arrays of signed integers.
 * Each VLQ group encodes one signed integer using one or more Base64 characters.
 * @param string - The Base64 VLQ encoded string to decode.
 * @returns An array of decoded signed integers.
 * @throws `Error` If the string contains a character that is not valid Base64.
 * @example
 * ```typescript
 * decodeVLQ('A');    // [0]
 * decodeVLQ('C');    // [1]
 * decodeVLQ('D');    // [-1]
 * decodeVLQ('AAAA');  // [0, 0, 0, 0]
 * decodeVLQ('ACAGD'); // [0, 1, 0, 3, -1]
 * ```
 * @group Blob
 * @category VLQ
 */
export function decodeVLQ(string: string): number[] {
  const result: number[] = [];

  let shift = 0;
  let value = 0;

  for (const char of string) {
    let integer = charToInteger[char];

    if (integer === undefined) {
      throw new Error(`Invalid character (${char})`);
    }

    const hasContinuationBit = integer & 0b100000;

    integer &= 0b011111;
    value += integer << shift;

    if (hasContinuationBit) {
      shift += 5;
    } else {
      const shouldNegate = value & 0b000001;
      value >>>= 1;

      if (shouldNegate) {
        result.push(value === 0 ? -0x80000000 : -value);
      } else {
        result.push(value);
      }

      // reset
      value = 0;
      shift = 0;
    }
  }

  return result;
}
