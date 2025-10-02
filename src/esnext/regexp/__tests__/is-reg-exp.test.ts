import { isRegExp } from '../is-regexp.ts';

describe('isRegExp', () => {
  test('returns true for RegExp literals', () => {
    expect(isRegExp(/abc/v)).toBeTrue();
  });

  test('returns true for RegExp objects', () => {
    // eslint-disable-next-line prefer-regex-literals
    expect(isRegExp(new RegExp('abc', 'v'))).toBeTrue();
  });

  test('returns false for strings', () => {
    expect(isRegExp('abc')).toBeFalse();
  });

  test('returns false for numbers', () => {
    expect(isRegExp(123)).toBeFalse();
  });

  test('returns false for objects that are not RegExp', () => {
    expect(isRegExp({})).toBeFalse();
    expect(isRegExp({ source: 'abc', flags: 'g' })).toBeFalse();
  });

  test('returns false for null and undefined', () => {
    expect(isRegExp(null)).toBeFalse();
    expect(isRegExp(undefined)).toBeFalse();
  });

  test('returns false for arrays', () => {
    expect(isRegExp([])).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isRegExp(() => /abc/v)).toBeFalse();
  });
});
