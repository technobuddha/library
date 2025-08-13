import { fabricateNumericInteger } from './fabricate-numeric-integer.ts';

describe('fabricateNumericInteger', () => {
  test('should handle single digit numbers', () => {
    const o = { ordinal: false, precision: 9 as const };

    expect(fabricateNumericInteger(0, o)).toBe('0');
    expect(fabricateNumericInteger(5, o)).toBe('5');
    expect(fabricateNumericInteger(9, o)).toBe('9');
  });

  test('should handle multi-digit numbers', () => {
    const o = { ordinal: false, precision: 9 as const };

    expect(fabricateNumericInteger(12, o)).toBe('12');
    expect(fabricateNumericInteger(123, o)).toBe('123');
    expect(fabricateNumericInteger(1234, o)).toBe('1,234');
    expect(fabricateNumericInteger(1234567, o)).toBe('1,234,567');
    expect(fabricateNumericInteger(1000000, o)).toBe('1,000,000');
  });

  test('should pad groups with zeros', () => {
    const o = { ordinal: false, precision: 9 as const };

    expect(fabricateNumericInteger(1002, o)).toBe('1,002');
    expect(fabricateNumericInteger(1000002, o)).toBe('1,000,002');
    expect(fabricateNumericInteger(1000000000, o)).toBe('1,000,000,000');
  });

  test('should handle large numbers', () => {
    const o = { ordinal: false, precision: 9 as const };

    expect(fabricateNumericInteger(9876543210, o)).toBe('9,876,543,210');
    expect(fabricateNumericInteger(1e10, o)).toBe('10,000,000,000');
    expect(fabricateNumericInteger(1e100, o)).toBe(
      '10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000',
    );
  });

  test('should handle the ordinal option', () => {
    const o = { ordinal: true, precision: 9 as const };

    expect(fabricateNumericInteger(1, o)).toBe('1st');
    expect(fabricateNumericInteger(2, o)).toBe('2nd');
    expect(fabricateNumericInteger(3, o)).toBe('3rd');
    expect(fabricateNumericInteger(4, o)).toBe('4th');
    expect(fabricateNumericInteger(11, o)).toBe('11th');
    expect(fabricateNumericInteger(21, o)).toBe('21st');
    expect(fabricateNumericInteger(1234, o)).toBe('1,234th');
  });

  test('should handle zero with ordinal', () => {
    const o = { ordinal: true, precision: 9 as const };

    expect(fabricateNumericInteger(0, o)).toBe('0th');
  });

  test('should handle negative numbers as string (no sign)', () => {
    const o = { ordinal: false, precision: 9 as const };

    expect(fabricateNumericInteger(-1234, o)).toBe('1,234');
  });
});
