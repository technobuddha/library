import { deconstructNumber } from '../../construction/deconstruct-number.ts';
import { negativeZero } from '../../math/constants.ts';

import { deriveFraction } from '../derive-fraction.ts';

const defaultOptions: Parameters<typeof deriveFraction>[1] = {
  tolerance: 0.01,
  precision: 6,
  denominators: 'common',
};

function x(value: number, o = defaultOptions): ReturnType<typeof deriveFraction> {
  return deriveFraction(deconstructNumber(value, o.precision), o);
}

describe('deriveFraction', () => {
  test('should find exact fractions', () => {
    const o = { ...defaultOptions };

    expect(x(1, o)).toEqual({ numerator: 1, denominator: 1 });
    expect(x(1 / 2, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(x(1 / 3, o)).toEqual({ numerator: 1, denominator: 3 });
    expect(x(1 / 4, o)).toEqual({ numerator: 1, denominator: 4 });
    expect(x(1 / 5, o)).toEqual({ numerator: 1, denominator: 5 });
    expect(x(1 / 6, o)).toEqual({ numerator: 1, denominator: 6 });
    expect(x(1 / 7, o)).toEqual({ numerator: 1, denominator: 7 });
    expect(x(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(x(1 / 10, o)).toEqual({ numerator: 1, denominator: 10 });
    expect(x(1 / 12, o)).toEqual({ numerator: 1, denominator: 12 });
  });

  test('should use the lowest denominator', () => {
    const o = { ...defaultOptions };

    expect(x(0 / 8, o)).toEqual({ numerator: 0, denominator: 1 });
    expect(x(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(x(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(x(2 / 8, o)).toEqual({ numerator: 1, denominator: 4 });
    expect(x(3 / 8, o)).toEqual({ numerator: 3, denominator: 8 });
    expect(x(4 / 8, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(x(5 / 8, o)).toEqual({ numerator: 5, denominator: 8 });
    expect(x(6 / 8, o)).toEqual({ numerator: 3, denominator: 4 });
    expect(x(7 / 8, o)).toEqual({ numerator: 7, denominator: 8 });
    expect(x(8 / 8, o)).toEqual({ numerator: 1, denominator: 1 });
  });

  test('should approximate numbers that cannot be exactly represented', () => {
    const o = { ...defaultOptions };

    expect(x(0.133, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(x(0.134, o)).toEqual({ numerator: 1, denominator: 7 });
  });

  test('should fallback to decimal fractions if not within tolerance', () => {
    const o = { ...defaultOptions };

    expect(x(0.33, { ...o, tolerance: 0.1 })).toEqual({
      numerator: 1,
      denominator: 3,
    });
    expect(x(0.33, { ...o, tolerance: 0.01 })).toEqual({
      numerator: 1,
      denominator: 3,
    });
    expect(x(0.33, { ...o, tolerance: 0.001 })).toEqual({
      numerator: 33,
      denominator: 100,
    });
  });

  test('should handle whole numbers', () => {
    const o = { ...defaultOptions };

    expect(x(1, o)).toEqual({ numerator: 1, denominator: 1 });
    expect(x(2, o)).toEqual({ numerator: 2, denominator: 1 });
    expect(x(10, o)).toEqual({ numerator: 10, denominator: 1 });
  });

  test('should handle larger numbers', () => {
    const o = { ...defaultOptions };

    expect(x(1.5, o)).toEqual({ numerator: 3, denominator: 2 });
    expect(x(Math.PI, o)).toEqual({
      numerator: 22,
      denominator: 7,
    });
    expect(x(12.3456, o)).toEqual({
      numerator: 123456,
      denominator: 10000,
    });
  });

  test('should handle negative numbers', () => {
    const o = { ...defaultOptions };

    expect(x(-1 / 2, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(x(1 / -3, o)).toEqual({ numerator: 1, denominator: 3 });
  });

  test('should handle zero', () => {
    const o = { ...defaultOptions };

    expect(x(0, o)).toEqual({ numerator: 0, denominator: 1 });
    expect(x(negativeZero, o)).toEqual({
      numerator: 0,
      denominator: 1,
    });
  });

  test('should handle wrench size denominators', () => {
    const o = { ...defaultOptions, denominators: 'wrench' as const };

    expect(x(1 / 32, o)).toEqual({ numerator: 1, denominator: 32 });
    expect(x(1 / 16, o)).toEqual({ numerator: 1, denominator: 16 });
    expect(x(1 / 8, o)).toEqual({ numerator: 1, denominator: 8 });
    expect(x(1 / 4, o)).toEqual({ numerator: 1, denominator: 4 });
    expect(x(1 / 2, o)).toEqual({ numerator: 1, denominator: 2 });
    expect(x(1, o)).toEqual({ numerator: 1, denominator: 1 });
  });

  test('should handle custom denominators', () => {
    const o1 = { ...defaultOptions };
    const o2 = { ...defaultOptions, denominators: [42, 69] };

    expect(x(1 / 12, o1)).toEqual({
      numerator: 1,
      denominator: 12,
    });
    expect(x(1 / 42, o1)).toEqual({
      numerator: 238095,
      denominator: 10000000,
    });
    expect(x(1 / 69, o1)).toEqual({
      numerator: 144928,
      denominator: 10000000,
    });
    expect(x(1 / 12, o2)).toEqual({
      numerator: 6,
      denominator: 69,
    });
    expect(x(1 / 42, o2)).toEqual({
      numerator: 1,
      denominator: 42,
    });
    expect(x(1 / 69, o2)).toEqual({
      numerator: 1,
      denominator: 69,
    });
  });

  test('should limit precision', () => {
    const o = { ...defaultOptions };

    expect(x(1 / 16, { ...o, precision: 1 })).toEqual({
      numerator: 6,
      denominator: 100,
    });
    expect(x(1 / 16, { ...o, precision: 2 })).toEqual({
      numerator: 63,
      denominator: 1000,
    });
    expect(x(1 / 16, { ...o, precision: 3 })).toEqual({
      numerator: 625,
      denominator: 10000,
    });
    expect(x(1 / 16, { ...o, precision: 4 })).toEqual({
      numerator: 625,
      denominator: 10000,
    });
    expect(x(1 / 16, { ...o, precision: 5 })).toEqual({
      numerator: 625,
      denominator: 10000,
    });
  });
});
