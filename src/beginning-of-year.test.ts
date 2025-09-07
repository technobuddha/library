import { beginningOfYear } from './beginning-of-year.ts';
import { month } from './date.ts';

describe('beginningOfYear', () => {
  test('should compute the beginning of the year', () => {
    expect(beginningOfYear(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('1 Jan 1969').toString(),
    );
  });

  test('should compute the UTC beginning of the year', () => {
    expect(
      beginningOfYear(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.january, 1)).toString());
  });
});
