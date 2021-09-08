import expect from '@util/expect';
import isSameMonth from '../src/isSameMonth';
import { month }   from '../src/constants';

describe(
    'isSameMonth',
    () => {
        test(
            'should check for date similarity',
            () => {
                expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1941'))).toBe(true);
                expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('8  Dec 1941'))).toBe(true);
                expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('26 Nov 1941'))).toBe(false);
                expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('14 Aug 1945'))).toBe(false);
            }
        );

        test(
            'should check for date similarity',
            () => {
                expect(isSameMonth(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1941, month.december,  7)), { UTC: true })).toBe(true);
                expect(isSameMonth(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1941, month.december,  8)), { UTC: true })).toBe(true);
                expect(isSameMonth(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1941, month.november, 26)), { UTC: true })).toBe(false);
                expect(isSameMonth(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1945, month.august,   14)), { UTC: true })).toBe(false);
            }
        );
    }
);
