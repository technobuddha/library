import 'mocha';
import { expect }          from 'chai';
import getOccuranceInMonth from '../src/getOccuranceInMonth';
import { day }             from '../src/constants';

describe(
    'getOccuranceInMonth',
    () => {
        it(
            'should find the occurances of a day in a month',
            () => {
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.sunday,    1)!.toString()).to.equal(new Date('05 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.monday,    1)!.toString()).to.equal(new Date('06 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.tuesday,   1)!.toString()).to.equal(new Date('07 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.wednesday, 1)!.toString()).to.equal(new Date('01 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.thursday,  1)!.toString()).to.equal(new Date('02 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.friday,    1)!.toString()).to.equal(new Date('03 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.saturday,  1)!.toString()).to.equal(new Date('04 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.sunday,    2)!.toString()).to.equal(new Date('12 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.monday,    2)!.toString()).to.equal(new Date('13 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.tuesday,   2)!.toString()).to.equal(new Date('14 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.wednesday, 2)!.toString()).to.equal(new Date('08 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.thursday,  2)!.toString()).to.equal(new Date('09 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.friday,    2)!.toString()).to.equal(new Date('10 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.saturday,  2)!.toString()).to.equal(new Date('11 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.sunday,    3)!.toString()).to.equal(new Date('19 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.monday,    3)!.toString()).to.equal(new Date('20 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.tuesday,   3)!.toString()).to.equal(new Date('21 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.wednesday, 3)!.toString()).to.equal(new Date('15 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.thursday,  3)!.toString()).to.equal(new Date('16 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.friday,    3)!.toString()).to.equal(new Date('17 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.saturday,  3)!.toString()).to.equal(new Date('18 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.sunday,    4)!.toString()).to.equal(new Date('26 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.monday,    4)!.toString()).to.equal(new Date('27 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.tuesday,   4)!.toString()).to.equal(new Date('28 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.wednesday, 4)!.toString()).to.equal(new Date('22 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.thursday,  4)!.toString()).to.equal(new Date('23 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.friday,    4)!.toString()).to.equal(new Date('24 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.saturday,  4)!.toString()).to.equal(new Date('25 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.sunday,    5)).to.equal(null);
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.monday,    5)).to.equal(null);
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.tuesday,   5)).to.equal(null);
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.wednesday, 5)!.toString()).to.equal(new Date('29 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.thursday,  5)!.toString()).to.equal(new Date('30 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.friday,    5)!.toString()).to.equal(new Date('31 Aug 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.saturday,  5)).to.equal(null);
            }
        );

        it(
            'should find the occurances of a day in a UTC month',
            () => {
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.sunday,    1, { UTC: true })!.toString()).to.equal(new Date('05 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.monday,    1, { UTC: true })!.toString()).to.equal(new Date('06 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.tuesday,   1, { UTC: true })!.toString()).to.equal(new Date('07 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.wednesday, 1, { UTC: true })!.toString()).to.equal(new Date('01 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.thursday,  1, { UTC: true })!.toString()).to.equal(new Date('02 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.friday,    1, { UTC: true })!.toString()).to.equal(new Date('03 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.saturday,  1, { UTC: true })!.toString()).to.equal(new Date('04 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.sunday,    2, { UTC: true })!.toString()).to.equal(new Date('12 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.monday,    2, { UTC: true })!.toString()).to.equal(new Date('13 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.tuesday,   2, { UTC: true })!.toString()).to.equal(new Date('14 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.wednesday, 2, { UTC: true })!.toString()).to.equal(new Date('08 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.thursday,  2, { UTC: true })!.toString()).to.equal(new Date('09 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.friday,    2, { UTC: true })!.toString()).to.equal(new Date('10 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.saturday,  2, { UTC: true })!.toString()).to.equal(new Date('11 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.sunday,    3, { UTC: true })!.toString()).to.equal(new Date('19 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.monday,    3, { UTC: true })!.toString()).to.equal(new Date('20 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.tuesday,   3, { UTC: true })!.toString()).to.equal(new Date('21 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.wednesday, 3, { UTC: true })!.toString()).to.equal(new Date('15 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.thursday,  3, { UTC: true })!.toString()).to.equal(new Date('16 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.friday,    3, { UTC: true })!.toString()).to.equal(new Date('17 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.saturday,  3, { UTC: true })!.toString()).to.equal(new Date('18 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.sunday,    4, { UTC: true })!.toString()).to.equal(new Date('26 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.monday,    4, { UTC: true })!.toString()).to.equal(new Date('27 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.tuesday,   4, { UTC: true })!.toString()).to.equal(new Date('28 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.wednesday, 4, { UTC: true })!.toString()).to.equal(new Date('22 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.thursday,  4, { UTC: true })!.toString()).to.equal(new Date('23 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.friday,    4, { UTC: true })!.toString()).to.equal(new Date('24 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.saturday,  4, { UTC: true })!.toString()).to.equal(new Date('25 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.sunday,    5, { UTC: true })).to.equal(null);
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.monday,    5, { UTC: true })).to.equal(null);
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.tuesday,   5, { UTC: true })).to.equal(null);
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.wednesday, 5, { UTC: true })!.toString()).to.equal(new Date('29 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.thursday,  5, { UTC: true })!.toString()).to.equal(new Date('30 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.friday,    5, { UTC: true })!.toString()).to.equal(new Date('31 Aug 2018 UTC').toString());
                expect(getOccuranceInMonth(new Date('31 Jul 2018 22:00 GMT-04:00'), day.saturday,  5, { UTC: true })).to.equal(null);
            }
        );

        it(
            'should check for out of range',
            () => {
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.sunday,    0)).to.equal(null);
                expect(getOccuranceInMonth(new Date('1 Aug 2018'), day.monday,    6)).to.equal(null);
            }
        );

        it(
            'should find the last occurance of a day in a month',
            () => {
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.sunday,    'last').toString()).to.equal(new Date('29 Jul 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.monday,    'last').toString()).to.equal(new Date('30 Jul 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.tuesday,   'last').toString()).to.equal(new Date('31 Jul 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.wednesday, 'last').toString()).to.equal(new Date('25 Jul 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.thursday,  'last').toString()).to.equal(new Date('26 Jul 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.friday,    'last').toString()).to.equal(new Date('27 Jul 2018').toString());
                expect(getOccuranceInMonth(new Date('1 Jul 2018'), day.saturday,  'last').toString()).to.equal(new Date('28 Jul 2018').toString());
            }
        );

        it(
            'should find the last occurance of a day in a UTC month',
            () => {
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.sunday,    'last', { UTC: true }).toUTCString()).to.equal(new Date('29 Jul 2018 UTC').toUTCString());
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.monday,    'last', { UTC: true }).toUTCString()).to.equal(new Date('30 Jul 2018 UTC').toUTCString());
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.tuesday,   'last', { UTC: true }).toUTCString()).to.equal(new Date('31 Jul 2018 UTC').toUTCString());
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.wednesday, 'last', { UTC: true }).toUTCString()).to.equal(new Date('25 Jul 2018 UTC').toUTCString());
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.thursday,  'last', { UTC: true }).toUTCString()).to.equal(new Date('26 Jul 2018 UTC').toUTCString());
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.friday,    'last', { UTC: true }).toUTCString()).to.equal(new Date('27 Jul 2018 UTC').toUTCString());
                expect(getOccuranceInMonth(new Date('30 Jun 2018 22:00 GMT-4:00'), day.saturday,  'last', { UTC: true }).toUTCString()).to.equal(new Date('28 Jul 2018 UTC').toUTCString());
            }
        );
    }
);
