import expect from '@util/expect';
import isMidnight from '../src/isMidnight';

describe(
    'isMidnight',
    () => {
        test(
            'should detect midnight',
            () => {
                expect(isMidnight(new Date('2018 Jul 4'))).toBe(true);
                expect(isMidnight(new Date('2018 Jul 4 00:00:00.001'))).toBe(false);
            }
        );

        test(
            'should detect midnight UTC',
            () => {
                expect(isMidnight(new Date('2018 Jul 3 20:00 GMT-04:00'), { UTC: true })).toBe(true);
                expect(isMidnight(new Date('2018 Jul 3 20:00:00.001 GMT-04:00'), { UTC: true })).toBe(false);
            }
        );
    }
);
