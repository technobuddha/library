import { day } from '../constants.ts';
import { dayOfWeek } from '../day-of-week.ts';

describe('dayOfWeek', () => {
  test('should detect weekday', () => {
    expect(dayOfWeek(new Date('4 Jul 2018'))).toBe(3);
  });

  test('should accept alternate start of week', () => {
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.sunday })).toBe(3);
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.monday })).toBe(2);
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.tuesday })).toBe(1);
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.wednesday })).toBe(0);
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.thursday })).toBe(6);
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.friday })).toBe(5);
    expect(dayOfWeek(new Date('4 Jul 2018'), { firstDayOfWeek: day.saturday })).toBe(4);
  });

  test('should detect UTC weekday', () => {
    expect(dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true })).toBe(3);
  });

  test('should accept UTC alternate start of week', () => {
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.sunday }),
    ).toBe(3);
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.monday }),
    ).toBe(2);
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.tuesday }),
    ).toBe(1);
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.wednesday }),
    ).toBe(0);
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.thursday }),
    ).toBe(6);
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.friday }),
    ).toBe(5);
    expect(
      dayOfWeek(new Date(Date.UTC(2018, 6, 4)), { utc: true, firstDayOfWeek: day.saturday }),
    ).toBe(4);
  });
});
