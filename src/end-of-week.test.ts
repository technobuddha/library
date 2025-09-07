import { month } from './date.ts';
import { endOfWeek } from './end-of-week.ts';

describe('endOfWeek', () => {
  test('should find the End of the week', () => {
    expect(endOfWeek(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('26 Jul 1969').toString(),
    );
  });

  test('should accept alternate start of week', () => {
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 0 }).toString()).toBe(
      new Date('26 Jul 1969').toString(),
    );
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 1 }).toString()).toBe(
      new Date('20 Jul 1969').toString(),
    );
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 2 }).toString()).toBe(
      new Date('21 Jul 1969').toString(),
    );
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 3 }).toString()).toBe(
      new Date('22 Jul 1969').toString(),
    );
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 4 }).toString()).toBe(
      new Date('23 Jul 1969').toString(),
    );
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 5 }).toString()).toBe(
      new Date('24 Jul 1969').toString(),
    );
    expect(endOfWeek(new Date('20 Jul 1969 20:18'), { firstDayOfWeek: 6 }).toString()).toBe(
      new Date('25 Jul 1969').toString(),
    );
  });

  test('should find the UTC End of the week', () => {
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { utc: true }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 26)).toString());
  });

  test('should accept alternate start of week UTC', () => {
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 0,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 26)).toString());
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 1,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 20)).toString());
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 2,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 21)).toString());
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 3,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 22)).toString());
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 4,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 23)).toString());
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 5,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 24)).toString());
    expect(
      endOfWeek(new Date(Date.UTC(1969, month.july, 20, 20, 18)), {
        utc: true,
        firstDayOfWeek: 6,
      }).toString(),
    ).toBe(new Date(Date.UTC(1969, month.july, 25)).toString());
  });
});
