import { month } from './constants.ts';
import { getEndOfMonth } from './get-end-of-month.ts';

describe('getEndOfMonth', () => {
  test('should compute End of the month', () => {
    expect(getEndOfMonth(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('31 Jul 1969').toString(),
    );
  });

  test('should compute UTC End of the month', () => {
    expect(
      getEndOfMonth(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { utc: true }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 31)).toString());
  });
});
