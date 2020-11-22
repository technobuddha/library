import 'mocha';
import { expect }    from 'chai';
import getISOWeekOfYear from '../src/getISOWeekOfYear';
//import { month }     from '../src/constants';

describe(
    'getISOWeekOfYear',
    () => {
        it(
            'should compute the week of the year',
            () => {
                // expect(getISOWeekOfYear(new Date('29 Dec 1999'))).to.deep.equal({ year: 1999, week: 52 });
                // expect(getISOWeekOfYear(new Date('30 Dec 1999'))).to.deep.equal({ year: 1999, week: 52 });
                // expect(getISOWeekOfYear(new Date('31 Dec 1999'))).to.deep.equal({ year: 1999, week: 52 });
                // expect(getISOWeekOfYear(new Date('01 Jan 2000'))).to.deep.equal({ year: 1999, week: 52 });
                // expect(getISOWeekOfYear(new Date('02 Jan 2000'))).to.deep.equal({ year: 1999, week: 52 });
                // expect(getISOWeekOfYear(new Date('03 Jan 2000'))).to.deep.equal({ year: 2000, week:  1 });
                // expect(getISOWeekOfYear(new Date('04 Jan 2000'))).to.deep.equal({ year: 2000, week:  1 });

                expect(getISOWeekOfYear(new Date('22 Dec 2003'))).to.deep.equal({ year: 2003, week: 52 });
                expect(getISOWeekOfYear(new Date('29 Dec 2003'))).to.deep.equal({ year: 2004, week:  1 });
                expect(getISOWeekOfYear(new Date('05 Jan 2004'))).to.deep.equal({ year: 2004, week:  2 });
                expect(getISOWeekOfYear(new Date('12 Jan 2004'))).to.deep.equal({ year: 2004, week:  3 });
                expect(getISOWeekOfYear(new Date('19 Jan 2004'))).to.deep.equal({ year: 2004, week:  4 });
                expect(getISOWeekOfYear(new Date('26 Jan 2004'))).to.deep.equal({ year: 2004, week:  5 });
                expect(getISOWeekOfYear(new Date('02 Feb 2004'))).to.deep.equal({ year: 2004, week:  6 });
                expect(getISOWeekOfYear(new Date('09 Feb 2004'))).to.deep.equal({ year: 2004, week:  7 });
                expect(getISOWeekOfYear(new Date('16 Feb 2004'))).to.deep.equal({ year: 2004, week:  8 });
                expect(getISOWeekOfYear(new Date('23 Feb 2004'))).to.deep.equal({ year: 2004, week:  9 });
                expect(getISOWeekOfYear(new Date('01 Mar 2004'))).to.deep.equal({ year: 2004, week: 10 });
                expect(getISOWeekOfYear(new Date('08 Mar 2004'))).to.deep.equal({ year: 2004, week: 11 });
                expect(getISOWeekOfYear(new Date('15 Mar 2004'))).to.deep.equal({ year: 2004, week: 12 });
                expect(getISOWeekOfYear(new Date('22 Mar 2004'))).to.deep.equal({ year: 2004, week: 13 });
                expect(getISOWeekOfYear(new Date('29 Mar 2004'))).to.deep.equal({ year: 2004, week: 14 });
                expect(getISOWeekOfYear(new Date('05 Apr 2004'))).to.deep.equal({ year: 2004, week: 15 });
                expect(getISOWeekOfYear(new Date('12 Apr 2004'))).to.deep.equal({ year: 2004, week: 16 });
                expect(getISOWeekOfYear(new Date('19 Apr 2004'))).to.deep.equal({ year: 2004, week: 17 });
                expect(getISOWeekOfYear(new Date('26 Apr 2004'))).to.deep.equal({ year: 2004, week: 18 });
                expect(getISOWeekOfYear(new Date('03 May 2004'))).to.deep.equal({ year: 2004, week: 19 });
                expect(getISOWeekOfYear(new Date('10 May 2004'))).to.deep.equal({ year: 2004, week: 20 });
                expect(getISOWeekOfYear(new Date('17 May 2004'))).to.deep.equal({ year: 2004, week: 21 });
                expect(getISOWeekOfYear(new Date('24 May 2004'))).to.deep.equal({ year: 2004, week: 22 });
                expect(getISOWeekOfYear(new Date('31 May 2004'))).to.deep.equal({ year: 2004, week: 23 });
                expect(getISOWeekOfYear(new Date('07 Jun 2004'))).to.deep.equal({ year: 2004, week: 24 });
                expect(getISOWeekOfYear(new Date('14 Jun 2004'))).to.deep.equal({ year: 2004, week: 25 });
                expect(getISOWeekOfYear(new Date('21 Jun 2004'))).to.deep.equal({ year: 2004, week: 26 });
                expect(getISOWeekOfYear(new Date('28 Jun 2004'))).to.deep.equal({ year: 2004, week: 27 });
                expect(getISOWeekOfYear(new Date('05 Jul 2004'))).to.deep.equal({ year: 2004, week: 28 });
                expect(getISOWeekOfYear(new Date('12 Jul 2004'))).to.deep.equal({ year: 2004, week: 29 });
                expect(getISOWeekOfYear(new Date('19 Jul 2004'))).to.deep.equal({ year: 2004, week: 30 });
                expect(getISOWeekOfYear(new Date('26 Jul 2004'))).to.deep.equal({ year: 2004, week: 31 });
                expect(getISOWeekOfYear(new Date('02 Aug 2004'))).to.deep.equal({ year: 2004, week: 32 });
                expect(getISOWeekOfYear(new Date('09 Aug 2004'))).to.deep.equal({ year: 2004, week: 33 });
                expect(getISOWeekOfYear(new Date('16 Aug 2004'))).to.deep.equal({ year: 2004, week: 34 });
                expect(getISOWeekOfYear(new Date('23 Aug 2004'))).to.deep.equal({ year: 2004, week: 35 });
                expect(getISOWeekOfYear(new Date('30 Aug 2004'))).to.deep.equal({ year: 2004, week: 36 });
                expect(getISOWeekOfYear(new Date('06 Sep 2004'))).to.deep.equal({ year: 2004, week: 37 });
                expect(getISOWeekOfYear(new Date('13 Sep 2004'))).to.deep.equal({ year: 2004, week: 38 });
                expect(getISOWeekOfYear(new Date('20 Sep 2004'))).to.deep.equal({ year: 2004, week: 39 });
                expect(getISOWeekOfYear(new Date('27 Sep 2004'))).to.deep.equal({ year: 2004, week: 40 });
                expect(getISOWeekOfYear(new Date('04 Oct 2004'))).to.deep.equal({ year: 2004, week: 41 });
                expect(getISOWeekOfYear(new Date('11 Oct 2004'))).to.deep.equal({ year: 2004, week: 42 });
                expect(getISOWeekOfYear(new Date('18 Oct 2004'))).to.deep.equal({ year: 2004, week: 43 });
                expect(getISOWeekOfYear(new Date('25 Oct 2004'))).to.deep.equal({ year: 2004, week: 44 });
                expect(getISOWeekOfYear(new Date('01 Nov 2004'))).to.deep.equal({ year: 2004, week: 45 });
                expect(getISOWeekOfYear(new Date('08 Nov 2004'))).to.deep.equal({ year: 2004, week: 46 });
                expect(getISOWeekOfYear(new Date('15 Nov 2004'))).to.deep.equal({ year: 2004, week: 47 });
                expect(getISOWeekOfYear(new Date('22 Nov 2004'))).to.deep.equal({ year: 2004, week: 48 });
                expect(getISOWeekOfYear(new Date('29 Nov 2004'))).to.deep.equal({ year: 2004, week: 49 });
                expect(getISOWeekOfYear(new Date('06 Dec 2004'))).to.deep.equal({ year: 2004, week: 50 });
                expect(getISOWeekOfYear(new Date('13 Dec 2004'))).to.deep.equal({ year: 2004, week: 51 });
                expect(getISOWeekOfYear(new Date('20 Dec 2004'))).to.deep.equal({ year: 2004, week: 52 });
                expect(getISOWeekOfYear(new Date('27 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('28 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('29 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('30 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('31 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('01 Jan 2005'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('02 Jan 2005'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getISOWeekOfYear(new Date('03 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
                expect(getISOWeekOfYear(new Date('04 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
                expect(getISOWeekOfYear(new Date('05 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
                expect(getISOWeekOfYear(new Date('06 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
                expect(getISOWeekOfYear(new Date('07 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
                expect(getISOWeekOfYear(new Date('08 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
            }
        );

        // it(
        //     'should compute the week of the UTC year',
        //     () => {
        //         expect(getISOWeekOfYear(new Date(Date.UTC(1999, month.december, 29)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(1999, month.december, 30)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(1999, month.december, 31)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2000, month.january,   1)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2000, month.january,   2)), {UTC: true})).to.deep.equal({ year: 2000, week:  1 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2000, month.january,   3)), {UTC: true})).to.deep.equal({ year: 2000, week:  1 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2000, month.january,   4)), {UTC: true})).to.deep.equal({ year: 2000, week:  1 });

        //         expect(getISOWeekOfYear(new Date(Date.UTC(2004, month.december, 29)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2004, month.december, 30)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2004, month.december, 31)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2005, month.january,   1)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2005, month.january,   2)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2005, month.january,   3)), {UTC: true})).to.deep.equal({ year: 2005, week:  1 });
        //         expect(getISOWeekOfYear(new Date(Date.UTC(2005, month.january,   4)), {UTC: true})).to.deep.equal({ year: 2005, week:  1 });
        //     }
        // );
    }
);




