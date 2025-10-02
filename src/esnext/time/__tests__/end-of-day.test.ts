import { endOfDay } from '../end-of-day.ts';

describe('endOfDay', () => {
  test('should return the end of the day (local time)', () => {
    const date = new Date('2024-06-01T10:15:30');
    const result = endOfDay(date);
    expect(result.getFullYear()).toBe(date.getFullYear());
    expect(result.getMonth()).toBe(date.getMonth());
    expect(result.getDate()).toBe(date.getDate());
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  test('should return the end of the day (UTC)', () => {
    const date = new Date(Date.UTC(2024, 5, 1, 10, 15, 30));
    const result = endOfDay(date, { utc: true });
    expect(result.getUTCFullYear()).toBe(2024);
    expect(result.getUTCMonth()).toBe(5);
    expect(result.getUTCDate()).toBe(1);
    expect(result.getUTCHours()).toBe(23);
    expect(result.getUTCMinutes()).toBe(59);
    expect(result.getUTCSeconds()).toBe(59);
    expect(result.getUTCMilliseconds()).toBe(999);
  });

  test('should not mutate the original date', () => {
    const date = new Date('2024-06-01T10:15:30');
    const originalTime = date.getTime();
    endOfDay(date);
    expect(date.getTime()).toBe(originalTime);
  });

  test('should work for dates at the end of the month', () => {
    const date = new Date('2024-02-29T05:00:00'); // Leap year
    const result = endOfDay(date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(29);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });
});
