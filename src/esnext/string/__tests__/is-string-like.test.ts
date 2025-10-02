import { isStringLike } from '../is-string-like.ts';

describe('isStringLike', () => {
  test('returns true for primitive strings', () => {
    expect(isStringLike('hello')).toBeTrue();
    expect(isStringLike('')).toBeTrue();
  });

  test('returns true for String objects', () => {
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isStringLike(new String('hello'))).toBeTrue();
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isStringLike(new String(''))).toBeTrue();
  });

  test('returns false for objects with toString method but not String objects', () => {
    expect(isStringLike({ toString: () => 'value' })).toBeFalse();
    expect(isStringLike({ toString: () => '' })).toBeFalse();
    expect(isStringLike({})).toBeFalse();
    expect(isStringLike({ a: 1 })).toBeFalse();
  });

  test('returns false for Date and RegExp objects', () => {
    expect(isStringLike(new Date())).toBeFalse();
    expect(isStringLike(/test/v)).toBeFalse();
  });

  test('returns false for arrays', () => {
    expect(isStringLike([])).toBeFalse();
    expect(isStringLike([1, 2, 3])).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isStringLike(() => 'hello')).toBeFalse();
  });

  test('returns false for primitives that are not strings', () => {
    expect(isStringLike(42)).toBeFalse();
    expect(isStringLike(true)).toBeFalse();
    expect(isStringLike(false)).toBeFalse();
    expect(isStringLike(Symbol('test'))).toBeFalse();
    expect(isStringLike(null)).toBeFalse();
    expect(isStringLike(undefined)).toBeFalse();
  });
});
