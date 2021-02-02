import expect from '../util/expect';
import getISOWeeksInYear from '../src/getISOWeeksInYear';
import { month }      from '../src/constants';

describe(
    'getISOWeeksInYear',
    () => {
        it(
            'should compute weeks in year',
            () => {
                expect(getISOWeeksInYear(new Date('1 Jan 2000'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2001'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2002'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2003'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2004'))).toBe(53);
                expect(getISOWeeksInYear(new Date('1 Jan 2005'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2006'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2007'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2008'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2009'))).toBe(53);
                expect(getISOWeeksInYear(new Date('1 Jan 2010'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2011'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2012'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2013'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2014'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2015'))).toBe(53);
                expect(getISOWeeksInYear(new Date('1 Jan 2016'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2017'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2018'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2019'))).toBe(52);
                expect(getISOWeeksInYear(new Date('1 Jan 2020'))).toBe(53);
            }
        );

        it(
            'should compute weeks in UTC year',
            () => {
                expect(getISOWeeksInYear(new Date(Date.UTC(2000, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2001, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2002, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2003, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2004, month.january, 1)), { UTC: true })).toBe(53);
                expect(getISOWeeksInYear(new Date(Date.UTC(2005, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2006, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2007, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2008, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2009, month.january, 1)), { UTC: true })).toBe(53);
                expect(getISOWeeksInYear(new Date(Date.UTC(2010, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2011, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2012, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2013, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2014, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2015, month.january, 1)), { UTC: true })).toBe(53);
                expect(getISOWeeksInYear(new Date(Date.UTC(2016, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2017, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2018, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2019, month.january, 1)), { UTC: true })).toBe(52);
                expect(getISOWeeksInYear(new Date(Date.UTC(2020, month.january, 1)), { UTC: true })).toBe(53);
            }
        );
    }
);
