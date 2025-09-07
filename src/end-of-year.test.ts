import { month } from './date.ts';
import { endOfYear } from './end-of-year.ts';

describe('endOfYear', () => {
  test('should compute the End of the year', () => {
    expect(endOfYear(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('31 Dec 1969').toString(),
    );
  });

  test('should compute the UTC End of the year', () => {
    expect(
      endOfYear(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { utc: true }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.december, 31)).toString());
  });
});
