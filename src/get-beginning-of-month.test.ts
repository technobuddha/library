import { month } from './constants.js';
import { getBeginningOfMonth } from './get-beginning-of-month.js';

describe('getBeginningOfMonth', () => {
  test('should compute beginning of the month', () => {
    expect(getBeginningOfMonth(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('1 Jul 1969').toString(),
    );
  });

  test('should compute UTC beginning of the month', () => {
    expect(
      getBeginningOfMonth(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 1)).toString());
  });
});
