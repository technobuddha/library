import { deconstructNumber } from '../../construction/deconstruct-number.ts';

import { fabricateAlphabeticFraction } from '../fabricate-alphabetic-fraction.ts';
import { type Numbering } from '../numbering.ts';

describe('fabricateAlphabeticFraction', () => {
  const baseOptions: Numbering = {
    output: { integer: 'alphabetic', fraction: 'alphabetic' },
    and: '',
    hyphen: ' ',
    tolerance: 0.01,
    denominators: 'common',
    precision: 9,
    ordinal: false,
    shift: false,
  };

  test('should return null for zero', () => {
    const input = deconstructNumber(0, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBeNull();
  });

  test('should handle halves', () => {
    const input = deconstructNumber(0.5, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐half');
  });

  test('should handle quarters', () => {
    const input = deconstructNumber(0.25, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐quarter');

    const input75 = deconstructNumber(0.75, 9);
    expect(fabricateAlphabeticFraction(input75.fractional, baseOptions)).toBe('three‐quarters');
  });

  test('should handle thirds', () => {
    const input = deconstructNumber(0.333333, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐third');

    const input66 = deconstructNumber(0.666666, 9);
    expect(fabricateAlphabeticFraction(input66.fractional, baseOptions)).toBe('two‐thirds');
  });

  test('should handle fifths', () => {
    const input = deconstructNumber(0.2, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐fifth');

    const input40 = deconstructNumber(0.4, 9);
    expect(fabricateAlphabeticFraction(input40.fractional, baseOptions)).toBe('two‐fifths');
  });

  test('should handle eighths', () => {
    const input = deconstructNumber(0.125, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐eighth');

    const input375 = deconstructNumber(0.375, 9);
    expect(fabricateAlphabeticFraction(input375.fractional, baseOptions)).toBe('three‐eighths');
  });

  test('should pluralize fraction words correctly', () => {
    const input2 = deconstructNumber(0.4, 9);
    expect(fabricateAlphabeticFraction(input2.fractional, baseOptions)).toBe('two‐fifths');

    const input3 = deconstructNumber(0.6, 9);
    expect(fabricateAlphabeticFraction(input3.fractional, baseOptions)).toBe('three‐fifths');
  });

  test('should handle sixths', () => {
    const input = deconstructNumber(0.166666, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐sixth');

    const input5 = deconstructNumber(0.833333, 9);
    expect(fabricateAlphabeticFraction(input5.fractional, baseOptions)).toBe('five‐sixths');
  });

  test('should handle tenths', () => {
    const input = deconstructNumber(0.1, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐tenth');

    const input7 = deconstructNumber(0.7, 9);
    expect(fabricateAlphabeticFraction(input7.fractional, baseOptions)).toBe('seven‐tenths');
  });

  test('should handle twelfths', () => {
    const input = deconstructNumber(0.083333, 9);
    expect(fabricateAlphabeticFraction(input.fractional, baseOptions)).toBe('one‐twelfth');
  });

  test('should handle sixteenths with wrench denominators', () => {
    const wrenchOptions: Numbering = {
      ...baseOptions,
      denominators: 'wrench',
    };
    const input = deconstructNumber(0.0625, 9);
    expect(fabricateAlphabeticFraction(input.fractional, wrenchOptions)).toBe('one‐sixteenth');

    const input5 = deconstructNumber(0.3125, 9);
    expect(fabricateAlphabeticFraction(input5.fractional, wrenchOptions)).toBe('five‐sixteenths');
  });

  test('should respect custom denominators', () => {
    const customOptions: Numbering = {
      ...baseOptions,
      denominators: [2, 4, 8],
    };

    const input = deconstructNumber(0.5, 9);
    expect(fabricateAlphabeticFraction(input.fractional, customOptions)).toBe('one‐half');

    const input25 = deconstructNumber(0.25, 9);
    expect(fabricateAlphabeticFraction(input25.fractional, customOptions)).toBe('one‐quarter');
  });

  test('should respect tolerance setting', () => {
    const strictOptions: Numbering = {
      ...baseOptions,
      tolerance: 0.001,
    };

    const input = deconstructNumber(0.333, 9);
    expect(fabricateAlphabeticFraction(input.fractional, strictOptions)).not.toBeNull();
  });

  test('should handle decimal values that do not match common fractions', () => {
    const input = deconstructNumber(0.123456, 9);
    const result = fabricateAlphabeticFraction(input.fractional, baseOptions);
    expect(result).not.toBeNull();
  });

  test('should handle very small fractions', () => {
    const input = deconstructNumber(0.01, 9);
    const result = fabricateAlphabeticFraction(input.fractional, baseOptions);
    expect(result).not.toBeNull();
  });

  test('should use alphabetic integer for numerator', () => {
    const input = deconstructNumber(0.75, 9);
    const result = fabricateAlphabeticFraction(input.fractional, baseOptions);
    expect(result).toContain('three');
  });

  test('should handle wrench denominators', () => {
    const wrenchOptions: Numbering = {
      ...baseOptions,
      denominators: 'wrench',
    };

    const input = deconstructNumber(0.5, 9);
    expect(fabricateAlphabeticFraction(input.fractional, wrenchOptions)).toBe('one‐half');
  });
});
