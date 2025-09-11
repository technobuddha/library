import { beginningOfMonth } from './beginning-of-month.ts';
import { month } from './date.ts';

describe('beginningOfMonth', () => {
  test('should compute beginning of the month', () => {
    expect(beginningOfMonth(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('1 Jul 1969').toString(),
    );
  });

  test('should compute UTC beginning of the month', () => {
    expect(
      beginningOfMonth(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 1)).toString());
  });
});
