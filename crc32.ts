import isEmpty from 'lodash/isEmpty';

let crcTable = [] as number[];

/**
  * Compute the CRC32 checksum for a string
  * @param input        The string
  */
export function crc32(input: string): number {
    if(isEmpty(crcTable)) {
        for(let n = 0; n < 256; ++n) {
            let c = n;
            for(let k = 0; k < 8; ++k) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
    }

    let crc = -1;
    for(let i = 0; i < input.length; ++i)
        crc = (crc >>> 8) ^ crcTable[(crc ^ input.charCodeAt(i)) & 0xFF];

    return (crc ^ -1) >>> 0;
}

export default crc32;
