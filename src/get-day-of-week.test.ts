import { day } from './constants.ts';
import { getDayOfWeek } from './get-day-of-week.ts';

describe('getDayOfWeek', () => {
  test('should detect weekday', () => {
    expect(getDayOfWeek(new Date('4 Jul 2018'))).toBe(3);
  });

  test('should accept alternate start of week', () => {
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.sunday })).toBe(3);
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.monday })).toBe(2);
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.tuesday })).toBe(1);
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.wednesday })).toBe(0);
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.thursday })).toBe(6);
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.friday })).toBe(5);
    expect(getDayOfWeek(new Date('4 Jul 2018'), { startOfWeek: day.saturday })).toBe(4);
  });

  test('should detect UTC weekday', () => {
    expect(getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true })).toBe(3);
  });

  test('should accept UTC alternate start of week', () => {
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.sunday }),
    ).toBe(3);
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.monday }),
    ).toBe(2);
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.tuesday }),
    ).toBe(1);
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.wednesday }),
    ).toBe(0);
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.thursday }),
    ).toBe(6);
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.friday }),
    ).toBe(5);
    expect(
      getDayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, startOfWeek: day.saturday }),
    ).toBe(4);
  });
});
