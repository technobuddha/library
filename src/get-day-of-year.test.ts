import { month } from './constants.ts';
import { getDayOfYear } from './get-day-of-year.ts';

describe('getDayOfYear', () => {
  test('should convert to day of year', () => {
    expect(getDayOfYear(new Date('1 Mar 2004'))).toBe(61);
    expect(getDayOfYear(new Date('1 Mar 2005'))).toBe(60);
  });

  test('should convert to UTC day of year', () => {
    expect(getDayOfYear(new Date(Date.UTC(2004, month.march, 1)), { utc: true })).toBe(61);
    expect(getDayOfYear(new Date(Date.UTC(2005, month.march, 1)), { utc: true })).toBe(60);
  });
});
