import { month } from './date.ts';
import { dayOfYear } from './day-of-year.ts';

describe('dayOfYear', () => {
  test('should convert to day of year', () => {
    expect(dayOfYear(new Date('1 Mar 2004'))).toBe(61);
    expect(dayOfYear(new Date('1 Mar 2005'))).toBe(60);
  });

  test('should convert to UTC day of year', () => {
    expect(dayOfYear(new Date(Date.UTC(2004, month.march, 1)), { utc: true })).toBe(61);
    expect(dayOfYear(new Date(Date.UTC(2005, month.march, 1)), { utc: true })).toBe(60);
  });
});
