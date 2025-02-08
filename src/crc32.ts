import { isEmpty } from 'lodash-es';

const crcTable: number[] = [];

/**
 * Compute the CRC32 checksum for a string
 *
 * @param input - The string
 * @returns the CRC32 checksum
 */

/* eslint-disable no-bitwise */
export function crc32(input: string): number {
  if (isEmpty(crcTable)) {
    for (let n = 0; n < 256; ++n) {
      let c = n;
      for (let k = 0; k < 8; ++k) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }

      crcTable[n] = c;
    }
  }

  let crc = -1;
  for (let i = 0; i < input.length; ++i) {
    // eslint-disable-next-line unicorn/prefer-code-point
    crc = (crc >>> 8) ^ crcTable[(crc ^ input.charCodeAt(i)) & 0xff];
  }

  return (crc ^ -1) >>> 0;
}
/* eslint-enable no-bitwise */
