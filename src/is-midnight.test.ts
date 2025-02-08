import { isMidnight } from './is-midnight.ts';

describe('isMidnight', () => {
  test('should detect midnight', () => {
    expect(isMidnight(new Date('2018 Jul 4'))).toBeTrue();
    expect(isMidnight(new Date('2018 Jul 4 00:00:00.001'))).toBeFalse();
  });

  test('should detect midnight UTC', () => {
    expect(isMidnight(new Date('2018 Jul 3 20:00 GMT-04:00'), { utc: true })).toBeTrue();
    expect(isMidnight(new Date('2018 Jul 3 20:00:00.001 GMT-04:00'), { utc: true })).toBeFalse();
  });
});
