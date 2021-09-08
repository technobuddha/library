import expect from '@util/expect';
import isLeapYear from '../src/isLeapYear';
import { month }  from '../src/constants';

describe(
    'isLeapYear',
    () => {
        test(
            'should compute test dates',
            () => {
                expect(isLeapYear(new Date('1 Jan 2000'))).toBe(true);
                expect(isLeapYear(new Date('1 Jan 2001'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2002'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2003'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2004'))).toBe(true);
                expect(isLeapYear(new Date('1 Jan 2005'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2006'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2007'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2008'))).toBe(true);
                expect(isLeapYear(new Date('1 Jan 2009'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2010'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2011'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2012'))).toBe(true);
                expect(isLeapYear(new Date('1 Jan 2013'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2014'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2015'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2016'))).toBe(true);
                expect(isLeapYear(new Date('1 Jan 2017'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2018'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2019'))).toBe(false);
                expect(isLeapYear(new Date('1 Jan 2020'))).toBe(true);
            }
        );

        test(
            'should compute test numbers',
            () => {
                expect(isLeapYear(2000)).toBe(true);
                expect(isLeapYear(2001)).toBe(false);
                expect(isLeapYear(2002)).toBe(false);
                expect(isLeapYear(2003)).toBe(false);
                expect(isLeapYear(2004)).toBe(true);
                expect(isLeapYear(2005)).toBe(false);
                expect(isLeapYear(2006)).toBe(false);
                expect(isLeapYear(2007)).toBe(false);
                expect(isLeapYear(2008)).toBe(true);
                expect(isLeapYear(2009)).toBe(false);
                expect(isLeapYear(2010)).toBe(false);
                expect(isLeapYear(2011)).toBe(false);
                expect(isLeapYear(2012)).toBe(true);
                expect(isLeapYear(2013)).toBe(false);
                expect(isLeapYear(2014)).toBe(false);
                expect(isLeapYear(2015)).toBe(false);
                expect(isLeapYear(2016)).toBe(true);
                expect(isLeapYear(2017)).toBe(false);
                expect(isLeapYear(2018)).toBe(false);
                expect(isLeapYear(2019)).toBe(false);
                expect(isLeapYear(2020)).toBe(true);
            }
        );

        test(
            'should compute test UTC dates',
            () => {
                expect(isLeapYear(new Date(Date.UTC(2000, month.january, 1)), { UTC: true })).toBe(true);
                expect(isLeapYear(new Date(Date.UTC(2001, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2002, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2003, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2004, month.january, 1)), { UTC: true })).toBe(true);
                expect(isLeapYear(new Date(Date.UTC(2005, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2006, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2007, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2008, month.january, 1)), { UTC: true })).toBe(true);
                expect(isLeapYear(new Date(Date.UTC(2009, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2010, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2011, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2012, month.january, 1)), { UTC: true })).toBe(true);
                expect(isLeapYear(new Date(Date.UTC(2013, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2014, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2015, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2016, month.january, 1)), { UTC: true })).toBe(true);
                expect(isLeapYear(new Date(Date.UTC(2017, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2018, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2019, month.january, 1)), { UTC: true })).toBe(false);
                expect(isLeapYear(new Date(Date.UTC(2020, month.january, 1)), { UTC: true })).toBe(true);
            }
        );

        test(
            'should compute test UTC numbers',
            () => {
                expect(isLeapYear(2000, { UTC: true })).toBe(true);
                expect(isLeapYear(2001, { UTC: true })).toBe(false);
                expect(isLeapYear(2002, { UTC: true })).toBe(false);
                expect(isLeapYear(2003, { UTC: true })).toBe(false);
                expect(isLeapYear(2004, { UTC: true })).toBe(true);
                expect(isLeapYear(2005, { UTC: true })).toBe(false);
                expect(isLeapYear(2006, { UTC: true })).toBe(false);
                expect(isLeapYear(2007, { UTC: true })).toBe(false);
                expect(isLeapYear(2008, { UTC: true })).toBe(true);
                expect(isLeapYear(2009, { UTC: true })).toBe(false);
                expect(isLeapYear(2010, { UTC: true })).toBe(false);
                expect(isLeapYear(2011, { UTC: true })).toBe(false);
                expect(isLeapYear(2012, { UTC: true })).toBe(true);
                expect(isLeapYear(2013, { UTC: true })).toBe(false);
                expect(isLeapYear(2014, { UTC: true })).toBe(false);
                expect(isLeapYear(2015, { UTC: true })).toBe(false);
                expect(isLeapYear(2016, { UTC: true })).toBe(true);
                expect(isLeapYear(2017, { UTC: true })).toBe(false);
                expect(isLeapYear(2018, { UTC: true })).toBe(false);
                expect(isLeapYear(2019, { UTC: true })).toBe(false);
                expect(isLeapYear(2020, { UTC: true })).toBe(true);
            }
        );
    }
);
