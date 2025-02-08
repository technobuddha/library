import { isValidDate } from './is-valid-date.ts';

describe('isValidDate', () => {
  test('should detect invalid dates', () => {
    expect(isValidDate(new Date())).toBeTrue();
    expect(isValidDate(new Date('Jan 1 1970'))).toBeTrue();
    expect(isValidDate(new Date('not a date'))).toBeFalse();
    expect(isValidDate(new Date(Number.NaN))).toBeFalse();
  });
});
