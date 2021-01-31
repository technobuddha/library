import 'mocha';
import { expect }     from 'chai';
import getDaysInMonth from '../src/getDaysInMonth';
import { month }      from '../src/constants';

describe(
    'getDaysInMonth',
    () => {
        it(
            'should convert to day of year',
            () => {
                expect(getDaysInMonth(new Date('1 Jan 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Feb 2000'))).to.equal(29);
                expect(getDaysInMonth(new Date('1 Mar 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Apr 2000'))).to.equal(30);
                expect(getDaysInMonth(new Date('1 May 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Jun 2000'))).to.equal(30);
                expect(getDaysInMonth(new Date('1 Jul 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Aug 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Sep 2000'))).to.equal(30);
                expect(getDaysInMonth(new Date('1 Oct 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Nov 2000'))).to.equal(30);
                expect(getDaysInMonth(new Date('1 Dec 2000'))).to.equal(31);
                expect(getDaysInMonth(new Date('1 Feb 2001'))).to.equal(28);
            }
        );

        it(
            'should compute the days in a UTC month',
            () => {
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.january,   1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.february,  1)), { UTC: true })).to.equal(29);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.march,     1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.april,     1)), { UTC: true })).to.equal(30);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.may,       1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.june,      1)), { UTC: true })).to.equal(30);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.july,      1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.august,    1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.september, 1)), { UTC: true })).to.equal(30);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.october,   1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.november,  1)), { UTC: true })).to.equal(30);
                expect(getDaysInMonth(new Date(Date.UTC(2000, month.december,  1)), { UTC: true })).to.equal(31);
                expect(getDaysInMonth(new Date(Date.UTC(2001, month.february,  1)), { UTC: true })).to.equal(28);
            }
        );
    }
);
