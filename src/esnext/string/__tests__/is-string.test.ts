import { isString } from '../is-string.ts';

describe('isString', () => {
  test('returns true for primitive strings', () => {
    expect(isString('hello')).toBeTrue();
    expect(isString('')).toBeTrue();
  });

  test('returns true for String objects', () => {
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isString(new String('hello'))).toBeTrue();
    expect(isString(new Object('world'))).toBeTrue();
  });

  test('returns false for non-string primitives', () => {
    expect(isString(123)).toBeFalse();
    expect(isString(true)).toBeFalse();
    expect(isString(null)).toBeFalse();
    expect(isString(undefined)).toBeFalse();
    expect(isString(Symbol('sym'))).toBeFalse();
    expect(isString(0n)).toBeFalse();
  });

  test('returns false for arrays', () => {
    expect(isString([])).toBeFalse();
    expect(isString(['a', 'b'])).toBeFalse();
    expect(isString([1, 2, 3])).toBeFalse();
  });

  test('returns false for objects that are not strings', () => {
    expect(isString({})).toBeFalse();
    expect(isString({ toString: () => '[object String]' })).toBeFalse();
    expect(isString({ value: 'test' })).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isString(() => {})).toBeFalse();
    expect(isString(() => {})).toBeFalse();
  });
});
