import { month } from './date.ts';
import { isSameDay } from './is-same-day.ts';

describe('isSameDay', () => {
  test('should check for date similarity', () => {
    expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1941'))).toBeTrue();
    expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('8  Dec 1941'))).toBeFalse();
    expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('26 Nov 1941'))).toBeFalse();
    expect(isSameDay(new Date('7 Dec 1941 07:55'), new Date('14 Aug 1945'))).toBeFalse();
  });

  test('should check for day similarity', () => {
    expect(
      isSameDay(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 7)),
        { utc: true },
      ),
    ).toBeTrue();
    expect(
      isSameDay(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 8)),
        { utc: true },
      ),
    ).toBeFalse();
    expect(
      isSameDay(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.november, 26)),
        { utc: true },
      ),
    ).toBeFalse();
    expect(
      isSameDay(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1945, month.august, 14)),
        { utc: true },
      ),
    ).toBeFalse();
  });
});
