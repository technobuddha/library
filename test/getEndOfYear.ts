import expect from '../util/expect';
import getEndOfYear from '../src/getEndOfYear';
import { month }          from '../src/constants';

describe(
    'getEndOfYear',
    () => {
        test(
            'should compute the End of the year',
            () => {
                expect(getEndOfYear(new Date('20 Jul 1969 20:18')).toString()).toBe(new Date('31 Dec 1969').toString());
            }
        );

        test(
            'should compute the UTC End of the year',
            () => {
                expect(getEndOfYear(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true }).toString()).toBe(new Date(Date.UTC(1969, month.december, 31)).toString());
            }
        );
    }
);
