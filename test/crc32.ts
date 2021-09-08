import expect from '@util/expect';
import crc32 from '../src/crc32';

describe(
    'crc32',
    () => {
        test(
            'computes checksum & build table',
            () => {
                expect(crc32('The quick brown fox jumped over the lazy dog.')).toBe(2191738434);
            }
        );

        test(
            'computes checksum',
            () => {
                expect(crc32('The way to get started is to quit talking and begin doing.')).toBe(2146148899);
            }
        );
    }
);
