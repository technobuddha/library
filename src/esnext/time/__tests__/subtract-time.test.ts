import { subtractTime } from '../subtract-time.ts';

describe('subtractTime', () => {
  test('should subtract years', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { years: 1 }).toString()).toBe(
      new Date(1999, 0, 1, 2, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { years: -1 }).toString()).toBe(
      new Date(2001, 0, 1, 2, 3, 4, 5).toString(),
    );

    expect(subtractTime(new Date(2000, 1, 29, 2, 3, 4, 5), { years: 1 }).toString()).toBe(
      new Date(1999, 2, 1, 2, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 1, 29, 2, 3, 4, 5), { years: -1 }).toString()).toBe(
      new Date(2001, 2, 1, 2, 3, 4, 5).toString(),
    );
  });

  test('should subtract months', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { months: 1 }).toString()).toBe(
      new Date(1999, 11, 1, 2, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { months: -1 }).toString()).toBe(
      new Date(2000, 1, 1, 2, 3, 4, 5).toString(),
    );

    expect(subtractTime(new Date(2000, 0, 31, 2, 3, 4, 5), { months: 1 }).toString()).toBe(
      new Date(1999, 11, 31, 2, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 31, 2, 3, 4, 5), { months: -1 }).toString()).toBe(
      new Date(2000, 2, 2, 2, 3, 4, 5).toString(),
    );
  });

  test('should subtract days', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { days: 1 }).toString()).toBe(
      new Date(1999, 11, 31, 2, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { days: -1 }).toString()).toBe(
      new Date(2000, 0, 2, 2, 3, 4, 5).toString(),
    );

    expect(subtractTime(new Date(2000, 0, 31, 2, 3, 4, 5), { days: 1 }).toString()).toBe(
      new Date(2000, 0, 30, 2, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 31, 2, 3, 4, 5), { days: -1 }).toString()).toBe(
      new Date(2000, 1, 1, 2, 3, 4, 5).toString(),
    );
  });

  test('should subtract hours', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { hours: 1 }).toString()).toBe(
      new Date(2000, 0, 1, 1, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { hours: -1 }).toString()).toBe(
      new Date(2000, 0, 1, 3, 3, 4, 5).toString(),
    );

    expect(subtractTime(new Date(2000, 0, 1, 0, 3, 4, 5), { hours: 1 }).toString()).toBe(
      new Date(1999, 11, 31, 23, 3, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 23, 3, 4, 5), { hours: -1 }).toString()).toBe(
      new Date(2000, 0, 2, 0, 3, 4, 5).toString(),
    );
  });

  test('should subtract minutes', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { minutes: 1 }).toString()).toBe(
      new Date(2000, 0, 1, 2, 2, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { minutes: -1 }).toString()).toBe(
      new Date(2000, 0, 1, 2, 4, 4, 5).toString(),
    );

    expect(subtractTime(new Date(2000, 0, 1, 0, 0, 4, 5), { minutes: 1 }).toString()).toBe(
      new Date(1999, 11, 31, 23, 59, 4, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 31, 23, 59, 4, 5), { minutes: -1 }).toString()).toBe(
      new Date(2000, 1, 1, 0, 0, 4, 5).toString(),
    );
  });

  test('should subtract seconds', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { seconds: 1 }).toString()).toBe(
      new Date(2000, 0, 1, 2, 3, 3, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { seconds: -1 }).toString()).toBe(
      new Date(2000, 0, 1, 2, 3, 5, 5).toString(),
    );

    expect(subtractTime(new Date(2000, 0, 1, 0, 0, 0, 5), { seconds: 1 }).toString()).toBe(
      new Date(1999, 11, 31, 23, 59, 59, 5).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 31, 23, 59, 59, 5), { seconds: -1 }).toString()).toBe(
      new Date(2000, 1, 1, 0, 0, 0, 5).toString(),
    );
  });

  test('should subtract milliseconds', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { milliseconds: 1 }).toString()).toBe(
      new Date(2000, 0, 1, 2, 3, 4, 4).toString(),
    );
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5), { milliseconds: -1 }).toString()).toBe(
      new Date(2000, 0, 1, 2, 3, 4, 6).toString(),
    );

    expect(subtractTime(new Date(2000, 0, 1, 0, 0, 0, 0), { milliseconds: 1 }).toString()).toBe(
      new Date(1999, 11, 31, 23, 59, 59, 999).toString(),
    );
    expect(
      subtractTime(new Date(2000, 0, 31, 23, 59, 59, 999), { milliseconds: -1 }).toString(),
    ).toBe(new Date(2000, 1, 1, 0, 0, 0, 0).toString());
  });

  test('should subtract combinations', () => {
    expect(
      subtractTime(new Date(2001, 2, 4, 6, 8, 10, 12), {
        years: 1,
        months: 2,
        days: 3,
        hours: 4,
        minutes: 5,
        seconds: 6,
        milliseconds: 7,
      }).toString(),
    ).toBe(new Date(2000, 0, 1, 2, 3, 4, 5).toString());
  });

  test('should take no parameter', () => {
    expect(subtractTime(new Date(2000, 0, 1, 2, 3, 4, 5)).toString()).toBe(
      new Date(2000, 0, 1, 2, 3, 4, 5).toString(),
    );
  });
});
