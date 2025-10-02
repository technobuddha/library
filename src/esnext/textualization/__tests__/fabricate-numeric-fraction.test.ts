import { deconstructNumber } from '../../construction/deconstruct-number.ts';

import { fabricateNumericFraction } from '../fabricate-numeric-fraction.ts';
import { type Numbering } from '../numbering.ts';

describe('fabricateNumericFraction', () => {
  const baseOptions: Pick<Numbering, 'ordinal' | 'tolerance' | 'precision' | 'denominators'> = {
    ordinal: false,
    tolerance: 0.01,
    precision: 9,
    denominators: 'common',
  };

  test('should return null for zero', () => {
    const input = deconstructNumber(0, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBeNull();
  });

  test('should handle halves', () => {
    const input = deconstructNumber(0.5, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄2');
  });

  test('should handle quarters', () => {
    const input = deconstructNumber(0.25, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄4');

    const input75 = deconstructNumber(0.75, 9);
    expect(fabricateNumericFraction(input75.fractional, baseOptions)).toBe('3⁄4');
  });

  test('should handle thirds', () => {
    const input = deconstructNumber(0.333333, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄3');

    const input66 = deconstructNumber(0.666666, 9);
    expect(fabricateNumericFraction(input66.fractional, baseOptions)).toBe('2⁄3');
  });

  test('should handle fifths', () => {
    const input = deconstructNumber(0.2, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄5');

    const input40 = deconstructNumber(0.4, 9);
    expect(fabricateNumericFraction(input40.fractional, baseOptions)).toBe('2⁄5');

    const input80 = deconstructNumber(0.8, 9);
    expect(fabricateNumericFraction(input80.fractional, baseOptions)).toBe('4⁄5');
  });

  test('should handle eighths', () => {
    const input = deconstructNumber(0.125, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄8');

    const input375 = deconstructNumber(0.375, 9);
    expect(fabricateNumericFraction(input375.fractional, baseOptions)).toBe('3⁄8');

    const input625 = deconstructNumber(0.625, 9);
    expect(fabricateNumericFraction(input625.fractional, baseOptions)).toBe('5⁄8');

    const input875 = deconstructNumber(0.875, 9);
    expect(fabricateNumericFraction(input875.fractional, baseOptions)).toBe('7⁄8');
  });

  test('should handle sixths', () => {
    const input = deconstructNumber(0.166666, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄6');

    const input5 = deconstructNumber(0.833333, 9);
    expect(fabricateNumericFraction(input5.fractional, baseOptions)).toBe('5⁄6');
  });

  test('should handle tenths', () => {
    const input = deconstructNumber(0.1, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄10');

    const input3 = deconstructNumber(0.3, 9);
    expect(fabricateNumericFraction(input3.fractional, baseOptions)).toBe('3⁄10');

    const input7 = deconstructNumber(0.7, 9);
    expect(fabricateNumericFraction(input7.fractional, baseOptions)).toBe('7⁄10');
  });

  test('should handle twelfths', () => {
    const input = deconstructNumber(0.083333, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄12');

    const input5 = deconstructNumber(0.416666, 9);
    expect(fabricateNumericFraction(input5.fractional, baseOptions)).toBe('5⁄12');
  });

  test('should handle sixteenths with wrench denominators', () => {
    const wrenchOptions = {
      ...baseOptions,
      denominators: 'wrench' as const,
    };
    const input = deconstructNumber(0.0625, 9);
    expect(fabricateNumericFraction(input.fractional, wrenchOptions)).toBe('1⁄16');

    const input5 = deconstructNumber(0.3125, 9);
    expect(fabricateNumericFraction(input5.fractional, wrenchOptions)).toBe('5⁄16');

    const input9 = deconstructNumber(0.5625, 9);
    expect(fabricateNumericFraction(input9.fractional, wrenchOptions)).toBe('9⁄16');
  });

  test('should respect custom denominators', () => {
    const customOptions = {
      ...baseOptions,
      denominators: [2, 4, 8] as number[],
    };

    const input = deconstructNumber(0.5, 9);
    expect(fabricateNumericFraction(input.fractional, customOptions)).toBe('1⁄2');

    const input25 = deconstructNumber(0.25, 9);
    expect(fabricateNumericFraction(input25.fractional, customOptions)).toBe('1⁄4');

    const input125 = deconstructNumber(0.125, 9);
    expect(fabricateNumericFraction(input125.fractional, customOptions)).toBe('1⁄8');
  });

  test('should respect tolerance setting', () => {
    const strictOptions = {
      ...baseOptions,
      tolerance: 0.001,
    };

    const input = deconstructNumber(0.333, 9);
    expect(fabricateNumericFraction(input.fractional, strictOptions)).not.toBeNull();
  });

  test('should handle decimal values that do not match common fractions', () => {
    const input = deconstructNumber(0.123456, 9);
    const result = fabricateNumericFraction(input.fractional, baseOptions);
    expect(result).not.toBeNull();
    expect(result).toContain('⁄');
  });

  test('should handle very small fractions', () => {
    const input = deconstructNumber(0.01, 9);
    const result = fabricateNumericFraction(input.fractional, baseOptions);
    expect(result).not.toBeNull();
    expect(result).toContain('⁄');
  });

  test('should format denominator correctly', () => {
    const input = deconstructNumber(0.1, 9);
    const result = fabricateNumericFraction(input.fractional, baseOptions);
    expect(result).toBe('1⁄10');
  });

  test('should handle hundredths', () => {
    const input = deconstructNumber(0.01, 9);
    const result = fabricateNumericFraction(input.fractional, baseOptions);
    expect(result).toContain('⁄');
  });

  test('should handle wrench denominators', () => {
    const wrenchOptions = {
      ...baseOptions,
      denominators: 'wrench' as const,
    };

    const input = deconstructNumber(0.5, 9);
    expect(fabricateNumericFraction(input.fractional, wrenchOptions)).toBe('1⁄2');

    const input0625 = deconstructNumber(0.0625, 9);
    expect(fabricateNumericFraction(input0625.fractional, wrenchOptions)).toBe('1⁄16');
  });

  test('should handle precision parameter', () => {
    const preciseOptions = {
      ...baseOptions,
      precision: 6 as const,
    };

    const input = deconstructNumber(0.333333, 6);
    expect(fabricateNumericFraction(input.fractional, preciseOptions)).not.toBeNull();
  });

  test('should simplify fractions when appropriate', () => {
    const input = deconstructNumber(0.5, 9);
    expect(fabricateNumericFraction(input.fractional, baseOptions)).toBe('1⁄2');
  });
});
