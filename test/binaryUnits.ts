import expect from '@util/expect';
import binaryUnits from '../src/binaryUnits';

describe(
    'binaryUnits',
    () => {
        test(
            'should handle whole numbers than 1',
            () => {
                expect(binaryUnits(1)).toBe('1B');
                expect(binaryUnits(10)).toBe('10B');
                expect(binaryUnits(100)).toBe('100B');
                expect(binaryUnits(1000)).toBe('1000B');
                expect(binaryUnits(1024)).toBe('1KiB');
                expect(binaryUnits(1048576)).toBe('1MiB');
                expect(binaryUnits(1073741824)).toBe('1GiB');
                expect(binaryUnits(1099511627776)).toBe('1TiB');
                expect(binaryUnits(1125899906842624)).toBe('1PiB');
                expect(binaryUnits(1152921504606846976)).toBe('1EiB');
                expect(binaryUnits(1180591620717411303424)).toBe('1ZiB');
                expect(binaryUnits(1208925819614629174706176)).toBe('1YiB');
            }
        );

        test(
            'should handle fractional numbers',
            () => {
                expect(binaryUnits(1000000)).toBe('976.56KiB');
                expect(binaryUnits(1200000)).toBe('1.14MiB');
                expect(binaryUnits(1230000)).toBe('1.17MiB');
                expect(binaryUnits(1234000)).toBe('1.18MiB');
            }
        );

        test(
            'should handle precision',
            () => {
                expect(binaryUnits(1000000, { precision: 3 })).toBe('976.563KiB');
                expect(binaryUnits(1200000, { precision: 3 })).toBe('1.144MiB');
                expect(binaryUnits(1230000, { precision: 3 })).toBe('1.173MiB');
                expect(binaryUnits(1234000, { precision: 3 })).toBe('1.177MiB');
            }
        );

        //TODO [2021-09-30] format
    }
);
