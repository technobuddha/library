import { isDate } from './is-date.ts';

describe('isDate', () => {
  test('returns true for Date objects', () => {
    expect(isDate(new Date())).toBeTrue();
    expect(isDate(new Date('2020-01-01'))).toBeTrue();
  });

  test('returns false for date strings', () => {
    expect(isDate('2020-01-01')).toBeFalse();
    expect(isDate('')).toBeFalse();
  });

  test('returns false for numbers', () => {
    expect(isDate(0)).toBeFalse();
    expect(isDate(1234567890)).toBeFalse();
    expect(isDate(NaN)).toBeFalse();
  });

  test('returns false for objects that are not Date', () => {
    expect(isDate({})).toBeFalse();
    expect(isDate({ getTime: () => 0 })).toBeFalse();
    expect(isDate(Object.create(null))).toBeFalse();
  });

  test('returns false for arrays', () => {
    expect(isDate([])).toBeFalse();
    expect(isDate([new Date()])).toBeFalse();
  });

  test('returns false for null and undefined', () => {
    expect(isDate(null)).toBeFalse();
    expect(isDate(undefined)).toBeFalse();
  });

  test('returns false for boolean values', () => {
    expect(isDate(true)).toBeFalse();
    expect(isDate(false)).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isDate(() => {})).toBeFalse();
    expect(isDate(() => {})).toBeFalse();
  });

  test('returns false for Symbol', () => {
    expect(isDate(Symbol('date'))).toBeFalse();
  });
});
