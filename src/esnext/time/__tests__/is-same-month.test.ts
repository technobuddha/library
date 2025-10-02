import { month } from '../constants.ts';
import { isSameMonth } from '../is-same-month.ts';

describe('isSameMonth', () => {
  test('should check for date similarity', () => {
    expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1941'))).toBeTrue();
    expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('8  Dec 1941'))).toBeTrue();
    expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('26 Nov 1941'))).toBeFalse();
    expect(isSameMonth(new Date('7 Dec 1941 07:55'), new Date('14 Aug 1945'))).toBeFalse();
  });

  test('should check for month similarity', () => {
    expect(
      isSameMonth(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 7)),
        { utc: true },
      ),
    ).toBeTrue();
    expect(
      isSameMonth(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 8)),
        { utc: true },
      ),
    ).toBeTrue();
    expect(
      isSameMonth(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.november, 26)),
        { utc: true },
      ),
    ).toBeFalse();
    expect(
      isSameMonth(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1945, month.august, 14)),
        { utc: true },
      ),
    ).toBeFalse();
  });
});
