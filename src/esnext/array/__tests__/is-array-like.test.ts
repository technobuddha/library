import { isArrayLike } from '../is-array-like.ts';

describe('isArrayLike', () => {
  test('returns true for arrays', () => {
    expect(isArrayLike([1, 2, 3])).toBeTrue();
    expect(isArrayLike([])).toBeTrue();
  });

  test('returns true for strings', () => {
    expect(isArrayLike('hello')).toBeTrue();
    expect(isArrayLike('')).toBeTrue();
  });

  test('returns true for objects with valid length', () => {
    expect(isArrayLike({ length: 0 })).toBeTrue();
    expect(isArrayLike({ length: 5 })).toBeTrue();
    expect(isArrayLike({ 0: 'a', 1: 'b', length: 2 })).toBeTrue();
  });

  test('returns false for objects with invalid length', () => {
    expect(isArrayLike({ length: -1 })).toBeFalse();
    expect(isArrayLike({ length: 3.5 })).toBeFalse();
    expect(isArrayLike({ length: Number.MAX_SAFE_INTEGER + 1 })).toBeFalse();
  });

  test('returns false for objects without length', () => {
    expect(isArrayLike({})).toBeFalse();
    expect(isArrayLike({ a: 1, b: 2 })).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isArrayLike(() => {})).toBeFalse();
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function fn(): void {
      //
    }
    expect(isArrayLike(fn)).toBeFalse();
  });

  test('returns false for null and undefined', () => {
    expect(isArrayLike(null)).toBeFalse();
    expect(isArrayLike(undefined)).toBeFalse();
  });

  test('returns false for numbers, booleans, symbols, and bigints', () => {
    expect(isArrayLike(123)).toBeFalse();
    expect(isArrayLike(true)).toBeFalse();
    expect(isArrayLike(Symbol('sym'))).toBeFalse();
    expect(isArrayLike(0n)).toBeFalse();
  });
});
