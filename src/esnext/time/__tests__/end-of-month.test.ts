import { month } from '../constants.ts';
import { endOfMonth } from '../end-of-month.ts';

describe('endOfMonth', () => {
  test('should compute End of the month', () => {
    expect(endOfMonth(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('31 Jul 1969').toString(),
    );
  });

  test('should compute UTC End of the month', () => {
    expect(
      endOfMonth(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { utc: true }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 31)).toString());
  });
});
