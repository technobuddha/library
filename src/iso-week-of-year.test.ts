import { month } from './constants.ts';
import { isoWeekOfYear } from './iso-week-of-year.ts';

describe('getISOWeekOfYear', () => {
  test('should compute the week of the year', () => {
    expect(isoWeekOfYear(new Date('22 Dec 2003'))).toEqual({ year: 2003, week: 52 });
    expect(isoWeekOfYear(new Date('29 Dec 2003'))).toEqual({ year: 2004, week: 1 });
    expect(isoWeekOfYear(new Date('05 Jan 2004'))).toEqual({ year: 2004, week: 2 });
    expect(isoWeekOfYear(new Date('12 Jan 2004'))).toEqual({ year: 2004, week: 3 });
    expect(isoWeekOfYear(new Date('19 Jan 2004'))).toEqual({ year: 2004, week: 4 });
    expect(isoWeekOfYear(new Date('26 Jan 2004'))).toEqual({ year: 2004, week: 5 });
    expect(isoWeekOfYear(new Date('02 Feb 2004'))).toEqual({ year: 2004, week: 6 });
    expect(isoWeekOfYear(new Date('09 Feb 2004'))).toEqual({ year: 2004, week: 7 });
    expect(isoWeekOfYear(new Date('16 Feb 2004'))).toEqual({ year: 2004, week: 8 });
    expect(isoWeekOfYear(new Date('23 Feb 2004'))).toEqual({ year: 2004, week: 9 });
    expect(isoWeekOfYear(new Date('01 Mar 2004'))).toEqual({ year: 2004, week: 10 });
    expect(isoWeekOfYear(new Date('08 Mar 2004'))).toEqual({ year: 2004, week: 11 });
    expect(isoWeekOfYear(new Date('15 Mar 2004'))).toEqual({ year: 2004, week: 12 });
    expect(isoWeekOfYear(new Date('22 Mar 2004'))).toEqual({ year: 2004, week: 13 });
    expect(isoWeekOfYear(new Date('29 Mar 2004'))).toEqual({ year: 2004, week: 14 });
    expect(isoWeekOfYear(new Date('05 Apr 2004'))).toEqual({ year: 2004, week: 15 });
    expect(isoWeekOfYear(new Date('12 Apr 2004'))).toEqual({ year: 2004, week: 16 });
    expect(isoWeekOfYear(new Date('19 Apr 2004'))).toEqual({ year: 2004, week: 17 });
    expect(isoWeekOfYear(new Date('26 Apr 2004'))).toEqual({ year: 2004, week: 18 });
    expect(isoWeekOfYear(new Date('03 May 2004'))).toEqual({ year: 2004, week: 19 });
    expect(isoWeekOfYear(new Date('10 May 2004'))).toEqual({ year: 2004, week: 20 });
    expect(isoWeekOfYear(new Date('17 May 2004'))).toEqual({ year: 2004, week: 21 });
    expect(isoWeekOfYear(new Date('24 May 2004'))).toEqual({ year: 2004, week: 22 });
    expect(isoWeekOfYear(new Date('31 May 2004'))).toEqual({ year: 2004, week: 23 });
    expect(isoWeekOfYear(new Date('07 Jun 2004'))).toEqual({ year: 2004, week: 24 });
    expect(isoWeekOfYear(new Date('14 Jun 2004'))).toEqual({ year: 2004, week: 25 });
    expect(isoWeekOfYear(new Date('21 Jun 2004'))).toEqual({ year: 2004, week: 26 });
    expect(isoWeekOfYear(new Date('28 Jun 2004'))).toEqual({ year: 2004, week: 27 });
    expect(isoWeekOfYear(new Date('05 Jul 2004'))).toEqual({ year: 2004, week: 28 });
    expect(isoWeekOfYear(new Date('12 Jul 2004'))).toEqual({ year: 2004, week: 29 });
    expect(isoWeekOfYear(new Date('19 Jul 2004'))).toEqual({ year: 2004, week: 30 });
    expect(isoWeekOfYear(new Date('26 Jul 2004'))).toEqual({ year: 2004, week: 31 });
    expect(isoWeekOfYear(new Date('02 Aug 2004'))).toEqual({ year: 2004, week: 32 });
    expect(isoWeekOfYear(new Date('09 Aug 2004'))).toEqual({ year: 2004, week: 33 });
    expect(isoWeekOfYear(new Date('16 Aug 2004'))).toEqual({ year: 2004, week: 34 });
    expect(isoWeekOfYear(new Date('23 Aug 2004'))).toEqual({ year: 2004, week: 35 });
    expect(isoWeekOfYear(new Date('30 Aug 2004'))).toEqual({ year: 2004, week: 36 });
    expect(isoWeekOfYear(new Date('06 Sep 2004'))).toEqual({ year: 2004, week: 37 });
    expect(isoWeekOfYear(new Date('13 Sep 2004'))).toEqual({ year: 2004, week: 38 });
    expect(isoWeekOfYear(new Date('20 Sep 2004'))).toEqual({ year: 2004, week: 39 });
    expect(isoWeekOfYear(new Date('27 Sep 2004'))).toEqual({ year: 2004, week: 40 });
    expect(isoWeekOfYear(new Date('04 Oct 2004'))).toEqual({ year: 2004, week: 41 });
    expect(isoWeekOfYear(new Date('11 Oct 2004'))).toEqual({ year: 2004, week: 42 });
    expect(isoWeekOfYear(new Date('18 Oct 2004'))).toEqual({ year: 2004, week: 43 });
    expect(isoWeekOfYear(new Date('25 Oct 2004'))).toEqual({ year: 2004, week: 44 });
    expect(isoWeekOfYear(new Date('01 Nov 2004'))).toEqual({ year: 2004, week: 45 });
    expect(isoWeekOfYear(new Date('08 Nov 2004'))).toEqual({ year: 2004, week: 46 });
    expect(isoWeekOfYear(new Date('15 Nov 2004'))).toEqual({ year: 2004, week: 47 });
    expect(isoWeekOfYear(new Date('22 Nov 2004'))).toEqual({ year: 2004, week: 48 });
    expect(isoWeekOfYear(new Date('29 Nov 2004'))).toEqual({ year: 2004, week: 49 });
    expect(isoWeekOfYear(new Date('06 Dec 2004'))).toEqual({ year: 2004, week: 50 });
    expect(isoWeekOfYear(new Date('13 Dec 2004'))).toEqual({ year: 2004, week: 51 });
    expect(isoWeekOfYear(new Date('20 Dec 2004'))).toEqual({ year: 2004, week: 52 });
    expect(isoWeekOfYear(new Date('27 Dec 2004'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('28 Dec 2004'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('29 Dec 2004'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('30 Dec 2004'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('31 Dec 2004'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('01 Jan 2005'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('02 Jan 2005'))).toEqual({ year: 2004, week: 53 });
    expect(isoWeekOfYear(new Date('03 Jan 2005'))).toEqual({ year: 2005, week: 1 });
    expect(isoWeekOfYear(new Date('04 Jan 2005'))).toEqual({ year: 2005, week: 1 });
    expect(isoWeekOfYear(new Date('05 Jan 2005'))).toEqual({ year: 2005, week: 1 });
    expect(isoWeekOfYear(new Date('06 Jan 2005'))).toEqual({ year: 2005, week: 1 });
    expect(isoWeekOfYear(new Date('07 Jan 2005'))).toEqual({ year: 2005, week: 1 });
    expect(isoWeekOfYear(new Date('08 Jan 2005'))).toEqual({ year: 2005, week: 1 });
  });

  test('should compute the week of the UTC year', () => {
    expect(isoWeekOfYear(new Date(Date.UTC(1999, month.december, 29)), { utc: true })).toEqual({
      year: 1999,
      week: 52,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(1999, month.december, 30)), { utc: true })).toEqual({
      year: 1999,
      week: 52,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(1999, month.december, 31)), { utc: true })).toEqual({
      year: 1999,
      week: 52,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2000, month.january, 1)), { utc: true })).toEqual({
      year: 1999,
      week: 52,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2000, month.january, 2)), { utc: true })).toEqual({
      year: 1999,
      week: 52,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2000, month.january, 3)), { utc: true })).toEqual({
      year: 2000,
      week: 1,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2000, month.january, 4)), { utc: true })).toEqual({
      year: 2000,
      week: 1,
    });

    expect(isoWeekOfYear(new Date(Date.UTC(2004, month.december, 29)), { utc: true })).toEqual({
      year: 2004,
      week: 53,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2004, month.december, 30)), { utc: true })).toEqual({
      year: 2004,
      week: 53,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2004, month.december, 31)), { utc: true })).toEqual({
      year: 2004,
      week: 53,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2005, month.january, 1)), { utc: true })).toEqual({
      year: 2004,
      week: 53,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2005, month.january, 2)), { utc: true })).toEqual({
      year: 2004,
      week: 53,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2005, month.january, 3)), { utc: true })).toEqual({
      year: 2005,
      week: 1,
    });
    expect(isoWeekOfYear(new Date(Date.UTC(2005, month.january, 4)), { utc: true })).toEqual({
      year: 2005,
      week: 1,
    });
  });
});
