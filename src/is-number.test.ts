import { isNumber } from './is-number.ts';

describe('isNumber', () => {
  test('returns true for primitive numbers', () => {
    expect(isNumber(0)).toBeTrue();
    expect(isNumber(42)).toBeTrue();
    expect(isNumber(-3.14)).toBeTrue();
    expect(isNumber(NaN)).toBeTrue();
    expect(isNumber(Infinity)).toBeTrue();
    expect(isNumber(-Infinity)).toBeTrue();
  });

  test('returns true for Number objects', () => {
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isNumber(new Number(5))).toBeTrue();
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isNumber(new Number(NaN))).toBeTrue();
    // eslint-disable-next-line unicorn/new-for-builtins
    expect(isNumber(new Number(Infinity))).toBeTrue();
  });

  test('returns false for string representations of numbers', () => {
    expect(isNumber('123')).toBeFalse();
    expect(isNumber('NaN')).toBeFalse();
    expect(isNumber('Infinity')).toBeFalse();
  });

  test('returns false for non-number types', () => {
    expect(isNumber(undefined)).toBeFalse();
    expect(isNumber(null)).toBeFalse();
    expect(isNumber(true)).toBeFalse();
    expect(isNumber(false)).toBeFalse();
    expect(isNumber([])).toBeFalse();
    expect(isNumber({})).toBeFalse();
    expect(isNumber(() => 1)).toBeFalse();
    expect(isNumber(Symbol('1'))).toBeFalse();
  });
});
