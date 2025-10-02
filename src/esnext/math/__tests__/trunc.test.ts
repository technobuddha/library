import { trunc } from '../trunc.ts';

describe('trunc', () => {
  test('truncates positive numbers', () => {
    expect(trunc(3.9)).toBe(3);
    expect(trunc(123.456)).toBe(123);
  });

  test('truncates negative numbers', () => {
    expect(trunc(-2.7)).toBe(-2);
    expect(trunc(-123.456)).toBe(-123);
  });

  test('returns zero for zero', () => {
    expect(trunc(0)).toBe(0);
    expect(trunc(-0)).toBe(-0);
  });

  test('handles integers', () => {
    expect(trunc(42)).toBe(42);
    expect(trunc(-42)).toBe(-42);
  });

  test('handles tolerance and precision options', () => {
    expect(trunc(1.999, { tolerance: 0.01 })).toBe(2);
    expect(trunc(1.999, { precision: 1 })).toBe(1.9);
  });

  test('returns NaN for NaN', () => {
    expect(Number.isNaN(trunc(NaN))).toBeTrue();
  });

  test('returns Infinity for Infinity', () => {
    expect(trunc(Infinity)).toBe(Infinity);
    expect(trunc(-Infinity)).toBe(-Infinity);
  });
});
