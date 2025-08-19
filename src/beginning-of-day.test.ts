import { beginningOfDay } from './beginning-of-day.ts';

describe('getBeginningOfDay', () => {
  test('should calculate the beginning of the day', () => {
    expect(beginningOfDay(new Date('20 Jul 1969 20:18')).toString()).toBe(
      new Date('20 Jul 1969').toString(),
    );
  });

  test('should calculate the beginning of the UTC day', () => {
    expect(beginningOfDay(new Date('20 Jul 1969 20:18 GMT-04:00'), { utc: true }).toString()).toBe(
      new Date('20 Jul 1969 20:00').toString(),
    );
  });
});
