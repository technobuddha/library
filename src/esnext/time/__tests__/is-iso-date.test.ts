import { isISODate } from '../is-iso-date.ts';

describe('isISODate', () => {
  test('should return true for valid ISO dates', () => {
    expect(isISODate('2023-06-15T12:00:00Z')).toBeTrue();
    expect(isISODate('1999-12-31T23:59:59Z')).toBeTrue();
    expect(isISODate('0001-01-01T00:00:00Z')).toBeTrue();
  });

  test('should return false for invalid ISO dates', () => {
    expect(isISODate('15/06/2023')).toBeFalse();
    expect(isISODate('2023/06/15')).toBeFalse();
    expect(isISODate('2023-6-15')).toBeFalse();
    expect(isISODate('')).toBeFalse();
    expect(isISODate('2023-13-01')).toBeFalse();
    expect(isISODate('2023-00-10')).toBeFalse();
    expect(isISODate('2023-01-00')).toBeFalse();
    expect(isISODate('2023-01-32')).toBeFalse();
    expect(isISODate('2023-1-1')).toBeFalse();
    expect(isISODate('2023-01-1')).toBeFalse();
    expect(isISODate('2023-1-01')).toBeFalse();
    expect(isISODate('2023-06-15')).toBeFalse();
  });
});
