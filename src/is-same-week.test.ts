import { month } from './constants.js';
import isSameWeek from './is-same-week.js';

describe('isSameWeek', () => {
  test('should check for date similarity', () => {
    expect(isSameWeek(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1941'))).toBeTrue();
    expect(isSameWeek(new Date('7 Dec 1941 07:55'), new Date('8  Dec 1941'))).toBeTrue();
    expect(isSameWeek(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1942'))).toBeFalse();
  });

  test('should check for UTC date similarity', () => {
    expect(
      isSameWeek(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 7)),
        { UTC: true },
      ),
    ).toBeTrue();
    expect(
      isSameWeek(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 8)),
        { UTC: true },
      ),
    ).toBeTrue();
    expect(
      isSameWeek(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1942, month.december, 7)),
        { UTC: true },
      ),
    ).toBeFalse();
  });
});
