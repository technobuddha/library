import 'mocha';
import { expect }    from 'chai';
import getWeekOfYear from '../getWeekOfYear';
import { month }     from '../constants';

describe(
    'getWeekOfYear',
    () => {
        it(
            'should compute the week of the year',
            () => {
                expect(getWeekOfYear(new Date('29 Dec 1999'))).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date('30 Dec 1999'))).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date('31 Dec 1999'))).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date('01 Jan 2000'))).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date('02 Jan 2000'))).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date('03 Jan 2000'))).to.deep.equal({ year: 2000, week:  1 });
                expect(getWeekOfYear(new Date('04 Jan 2000'))).to.deep.equal({ year: 2000, week:  1 });

                expect(getWeekOfYear(new Date('29 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date('30 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date('31 Dec 2004'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date('01 Jan 2005'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date('02 Jan 2005'))).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date('03 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
                expect(getWeekOfYear(new Date('04 Jan 2005'))).to.deep.equal({ year: 2005, week:  1 });
            }
        );

        it(
            'should compute the week of the UTC year',
            () => {
                expect(getWeekOfYear(new Date(Date.UTC(1999, month.december, 29)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date(Date.UTC(1999, month.december, 30)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date(Date.UTC(1999, month.december, 31)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date(Date.UTC(2000, month.january,   1)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date(Date.UTC(2000, month.january,   2)), {UTC: true})).to.deep.equal({ year: 1999, week: 52 });
                expect(getWeekOfYear(new Date(Date.UTC(2000, month.january,   3)), {UTC: true})).to.deep.equal({ year: 2000, week:  1 });
                expect(getWeekOfYear(new Date(Date.UTC(2000, month.january,   4)), {UTC: true})).to.deep.equal({ year: 2000, week:  1 });

                expect(getWeekOfYear(new Date(Date.UTC(2004, month.december, 29)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date(Date.UTC(2004, month.december, 30)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date(Date.UTC(2004, month.december, 31)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date(Date.UTC(2005, month.january,   1)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date(Date.UTC(2005, month.january,   2)), {UTC: true})).to.deep.equal({ year: 2004, week: 53 });
                expect(getWeekOfYear(new Date(Date.UTC(2005, month.january,   3)), {UTC: true})).to.deep.equal({ year: 2005, week:  1 });
                expect(getWeekOfYear(new Date(Date.UTC(2005, month.january,   4)), {UTC: true})).to.deep.equal({ year: 2005, week:  1 });
            }
        );
    }
);




