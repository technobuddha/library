import expect from '../util/expect';
import getJulian       from '../src/getJulian';

describe(
    'getJulian',
    () => {
        test(
            'should convert to Julian dates',
            () => {
                expect(getJulian(new Date('13 September 1999 00:00 UTC'))).toBeCloseTo(2451434.5);
                expect(getJulian(new Date('20 July 1969 20:18 UTC'))).toBeCloseTo(2440423.345833);
            }
        );
    }
);
