import expect from '#util/expect';
import isSameDay  from '../src/isSameDay';
import { month }  from '../src/constants';

describe(
    'isSameDay',
    () => {
        test(
            'should check for date similarity',
            () => {
                expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1941'))).toBe(true);
                expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('8  Dec 1941'))).toBe(false);
                expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('26 Nov 1941'))).toBe(false);
                expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('14 Aug 1945'))).toBe(false);
            }
        );

        test(
            'should check for date similarity',
            () => {
                expect(isSameDay(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1941, month.december,  7)), { UTC: true })).toBe(true);
                expect(isSameDay(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1941, month.december,  8)), { UTC: true })).toBe(false);
                expect(isSameDay(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1941, month.november, 26)), { UTC: true })).toBe(false);
                expect(isSameDay(new Date(Date.UTC(1941, month.december, 7, 7, 55)), new Date(Date.UTC(1945, month.august,   14)), { UTC: true })).toBe(false);
            }
        );
    }
);
