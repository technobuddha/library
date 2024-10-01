import { month } from './constants.js';
import isSameYear from './is-same-year.js';

describe('isSameYear', () => {
  test('should check for date similarity', () => {
    expect(isSameYear(new Date('7 Dec 1941 07:55'), new Date('7  Dec 1941'))).toBeTrue();
    expect(isSameYear(new Date('7 Dec 1941 07:55'), new Date('8  Dec 1941'))).toBeTrue();
    expect(isSameYear(new Date('7 Dec 1941 07:55'), new Date('26 Nov 1941'))).toBeTrue();
    expect(isSameYear(new Date('7 Dec 1941 07:55'), new Date('14 Aug 1945'))).toBeFalse();
  });

  test('should check for UTC date similarity', () => {
    expect(
      isSameYear(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 7)),
        { UTC: true },
      ),
    ).toBeTrue();
    expect(
      isSameYear(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.december, 8)),
        { UTC: true },
      ),
    ).toBeTrue();
    expect(
      isSameYear(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1941, month.november, 26)),
        { UTC: true },
      ),
    ).toBeTrue();
    expect(
      isSameYear(
        new Date(Date.UTC(1941, month.december, 7, 7, 55)),
        new Date(Date.UTC(1945, month.august, 14)),
        { UTC: true },
      ),
    ).toBeFalse();
  });
});
