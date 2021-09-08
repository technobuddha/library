import expect from '@util/expect';
import getBeginningOfWeek from '../src/getBeginningOfWeek';
import { month }          from '../src/constants';

describe(
    'getBeginningOfWeek',
    () => {
        test(
            'should find the beginning of the week',
            () => {
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18')).toString()).toBe(new Date('20 Jul 1969').toString());
            }
        );

        test(
            'should accept alternate start of week',
            () => {
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 0 }).toString()).toBe(new Date('20 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 1 }).toString()).toBe(new Date('14 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 2 }).toString()).toBe(new Date('15 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 3 }).toString()).toBe(new Date('16 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 4 }).toString()).toBe(new Date('17 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 5 }).toString()).toBe(new Date('18 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 6 }).toString()).toBe(new Date('19 Jul 1969').toString());
            }
        );

        test(
            'should find the UTC beginning of the week',
            () => {
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true }).toString()).toBe(new Date(Date.UTC(1969, month.july, 20)).toString());
            }
        );

        test(
            'should accept alternate start of week',
            () => {
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 0 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 20)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 1 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 14)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 2 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 15)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 3 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 16)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 4 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 17)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 5 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 18)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 6 }).toString()).toBe(new Date(Date.UTC(1969, month.july, 19)).toString());
            }
        );
    }
);
