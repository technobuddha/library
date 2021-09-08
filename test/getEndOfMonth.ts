import expect from '@util/expect';
import getEndOfMonth from '../src/getEndOfMonth';
import { month }           from '../src/constants';

describe(
    'getEndOfMonth',
    () => {
        test(
            'should compute End of the month',
            () => {
                expect(getEndOfMonth(new Date('20 Jul 1969 20:18')).toString()).toBe(new Date('31 Jul 1969').toString());
            }
        );

        test(
            'should compute UTC End of the month',
            () => {
                expect(getEndOfMonth(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true }).toString()).toBe(new Date(Date.UTC(1969, month.july, 31)).toString());
            }
        );
    }
);
