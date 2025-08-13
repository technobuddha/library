import { negativeZero } from '../constants.ts';

import { deriveFraction } from './derive-fraction.ts';

describe('deriveFraction', () => {
  const defaultOptions: Parameters<typeof deriveFraction>[1] = {
    tolerance: 0.01,
    precision: 6,
    denominators: 'common',
  };

  test('should find exact fractions', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(1, o)).toEqual({ numerator: 1, denominator: 1 });
    expect(deriveFraction(1 / 2, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(deriveFraction(1 / 3, o)).toEqual({ numerator: 1, denominator: 3 });
    expect(deriveFraction(1 / 4, o)).toEqual({ numerator: 1, denominator: 4 });
    expect(deriveFraction(1 / 5, o)).toEqual({ numerator: 1, denominator: 5 });
    expect(deriveFraction(1 / 6, o)).toEqual({ numerator: 1, denominator: 6 });
    expect(deriveFraction(1 / 7, o)).toEqual({ numerator: 1, denominator: 7 });
    expect(deriveFraction(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(deriveFraction(1 / 10, o)).toEqual({ numerator: 1, denominator: 10 });
    expect(deriveFraction(1 / 12, o)).toEqual({ numerator: 1, denominator: 12 });
  });

  test('should use the lowest denominator', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(0 / 8, o)).toEqual({ numerator: 0, denominator: 1 });
    expect(deriveFraction(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(deriveFraction(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(deriveFraction(2 / 8, o)).toEqual({ numerator: 1, denominator: 4 });
    expect(deriveFraction(3 / 8, o)).toEqual({ numerator: 3, denominator: 8 });
    expect(deriveFraction(4 / 8, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(deriveFraction(5 / 8, o)).toEqual({ numerator: 5, denominator: 8 });
    expect(deriveFraction(6 / 8, o)).toEqual({ numerator: 3, denominator: 4 });
    expect(deriveFraction(7 / 8, o)).toEqual({ numerator: 7, denominator: 8 });
    expect(deriveFraction(8 / 8, o)).toEqual({ numerator: 1, denominator: 1 });
  });

  test('should approximate numbers that cannot be exactly represented', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(0.133, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(deriveFraction(0.134, o)).toEqual({ numerator: 1, denominator: 7 });
  });

  test('should fallback to decimal fractions if not within tolerance', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(0.33, { ...o, tolerance: 0.1 })).toEqual({
      numerator: 1,
      denominator: 3,
    });
    expect(deriveFraction(0.33, { ...o, tolerance: 0.01 })).toEqual({
      numerator: 1,
      denominator: 3,
    });
    expect(deriveFraction(0.33, { ...o, tolerance: 0.001 })).toEqual({
      numerator: 33,
      denominator: 100,
    });
  });

  test('should handle whole numbers', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(1, o)).toEqual({ numerator: 1, denominator: 1 });
    expect(deriveFraction(2, o)).toEqual({ numerator: 2, denominator: 1 });
    expect(deriveFraction(10, o)).toEqual({ numerator: 10, denominator: 1 });
  });

  test('should handle larger numbers', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(1.5, o)).toEqual({ numerator: 3, denominator: 2 });
    expect(deriveFraction(Math.PI, o)).toEqual({ numerator: 22, denominator: 7 });
    expect(deriveFraction(12.3456, o)).toEqual({ numerator: 123456, denominator: 10000 });
  });

  test('should handle negative numbers', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(-1 / 2, o)).toEqual({ numerator: -1, denominator: 2 });
    expect(deriveFraction(1 / -3, o)).toEqual({ numerator: -1, denominator: 3 });
  });

  test('should handle zero', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(0, o)).toEqual({ numerator: 0, denominator: 1 });
    expect(deriveFraction(negativeZero, o)).toEqual({ numerator: negativeZero, denominator: 1 });
  });

  test('should handle unusual numbers', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(Number.NaN, o)).toEqual({ numerator: Number.NaN, denominator: 1 });
    expect(deriveFraction(Number.POSITIVE_INFINITY, o)).toEqual({
      numerator: Number.POSITIVE_INFINITY,
      denominator: 1,
    });
    expect(deriveFraction(Number.NEGATIVE_INFINITY, o)).toEqual({
      numerator: Number.NEGATIVE_INFINITY,
      denominator: 1,
    });
  });

  test('should handle wrench size denominators', () => {
    const o = { ...defaultOptions, denominators: 'wrench' as const };

    expect(deriveFraction(1 / 32, o)).toEqual({ numerator: 1, denominator: 32 });
    expect(deriveFraction(1 / 16, o)).toEqual({ numerator: 1, denominator: 16 });
    expect(deriveFraction(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(deriveFraction(1 / 4, o)).toEqual({ numerator: 1, denominator: 4 });
    expect(deriveFraction(1 / 2, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(deriveFraction(1, o)).toEqual({ numerator: 1, denominator: 1 });
  });

  test('should handle custom denominators', () => {
    const o1 = { ...defaultOptions };
    const o2 = { ...defaultOptions, denominators: [42, 69] };

    expect(deriveFraction(1 / 12, o1)).toEqual({ numerator: 1, denominator: 12 });
    expect(deriveFraction(1 / 42, o1)).toEqual({ numerator: 2381, denominator: 100000 });
    expect(deriveFraction(1 / 69, o1)).toEqual({ numerator: 14493, denominator: 1000000 });
    expect(deriveFraction(1 / 12, o2)).toEqual({ numerator: 6, denominator: 69 });
    expect(deriveFraction(1 / 42, o2)).toEqual({ numerator: 1, denominator: 42 });
    expect(deriveFraction(1 / 69, o2)).toEqual({ numerator: 1, denominator: 69 });
  });

  test('should limit precision', () => {
    const o = { ...defaultOptions };

    expect(deriveFraction(1 / 16, { ...o, precision: 1 })).toEqual({
      numerator: 1,
      denominator: 10,
    });
    expect(deriveFraction(1 / 16, { ...o, precision: 2 })).toEqual({
      numerator: 6,
      denominator: 100,
    });
    expect(deriveFraction(1 / 16, { ...o, precision: 3 })).toEqual({
      numerator: 63,
      denominator: 1000,
    });
    expect(deriveFraction(1 / 16, { ...o, precision: 4 })).toEqual({
      numerator: 625,
      denominator: 10000,
    });
    expect(deriveFraction(1 / 16, { ...o, precision: 5 })).toEqual({
      numerator: 625,
      denominator: 10000,
    });
  });
});
