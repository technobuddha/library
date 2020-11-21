import 'mocha';
import { expect }         from 'chai';
import getBeginningOfWeek from '../getBeginningOfWeek';
import { month }          from '../constants';

describe(
    'getBeginningOfWeek',
    () => {
        it(
            'should find the beginning of the week',
            () => {
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18')).toString()).to.equal(new Date('20 Jul 1969').toString());
            }
        );

        it(
            'should accept alternate start of week',
            () => {
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 0 }).toString()).to.equal(new Date('20 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 1 }).toString()).to.equal(new Date('14 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 2 }).toString()).to.equal(new Date('15 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 3 }).toString()).to.equal(new Date('16 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 4 }).toString()).to.equal(new Date('17 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 5 }).toString()).to.equal(new Date('18 Jul 1969').toString());
                expect(getBeginningOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 6 }).toString()).to.equal(new Date('19 Jul 1969').toString());
            }
        );

        it(
            'should find the UTC beginning of the week',
            () => {
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 20)).toString());
            }
        );

        it(
            'should accept alternate start of week',
            () => {
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 0 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 20)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 1 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 14)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 2 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 15)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 3 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 16)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 4 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 17)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 5 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 18)).toString());
                expect(getBeginningOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true, firstDayOfWeek: 6 }).toString()).to.equal(new Date(Date.UTC(1969, month.july, 19)).toString());
            }
        );
    }
);









