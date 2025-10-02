import { fabricateAlphabeticInteger } from '../fabricate-alphabetic-integer.ts';
import { type Numbering } from '../numbering.ts';

describe('fabricateAlphabeticInteger', () => {
  const baseOptions: Numbering = {
    output: { integer: 'alphabetic', fraction: 'alphabetic' },
    and: '',
    hyphen: '-',
    tolerance: 0.01,
    denominators: 'common',
    precision: 9,
    ordinal: false,
    shift: false,
  };

  test('should handle zero', () => {
    expect(fabricateAlphabeticInteger(0, baseOptions)).toBe('');
  });

  test('should handle single digit numbers', () => {
    expect(fabricateAlphabeticInteger(1, baseOptions)).toBe('one');
    expect(fabricateAlphabeticInteger(5, baseOptions)).toBe('five');
    expect(fabricateAlphabeticInteger(9, baseOptions)).toBe('nine');
  });

  test('should handle teens', () => {
    expect(fabricateAlphabeticInteger(10, baseOptions)).toBe('ten');
    expect(fabricateAlphabeticInteger(11, baseOptions)).toBe('eleven');
    expect(fabricateAlphabeticInteger(13, baseOptions)).toBe('thirteen');
    expect(fabricateAlphabeticInteger(15, baseOptions)).toBe('fifteen');
    expect(fabricateAlphabeticInteger(19, baseOptions)).toBe('nineteen');
  });

  test('should handle tens', () => {
    expect(fabricateAlphabeticInteger(20, baseOptions)).toBe('twenty');
    expect(fabricateAlphabeticInteger(30, baseOptions)).toBe('thirty');
    expect(fabricateAlphabeticInteger(50, baseOptions)).toBe('fifty');
    expect(fabricateAlphabeticInteger(90, baseOptions)).toBe('ninety');
  });

  test('should handle compound numbers with hyphen', () => {
    expect(fabricateAlphabeticInteger(21, baseOptions)).toBe('twenty-one');
    expect(fabricateAlphabeticInteger(42, baseOptions)).toBe('forty-two');
    expect(fabricateAlphabeticInteger(99, baseOptions)).toBe('ninety-nine');
  });

  test('should handle hundreds', () => {
    expect(fabricateAlphabeticInteger(100, baseOptions)).toBe('one hundred');
    expect(fabricateAlphabeticInteger(200, baseOptions)).toBe('two hundred');
    expect(fabricateAlphabeticInteger(500, baseOptions)).toBe('five hundred');
    expect(fabricateAlphabeticInteger(900, baseOptions)).toBe('nine hundred');
  });

  test('should handle hundreds with "and"', () => {
    const optionsWithAnd: Numbering = { ...baseOptions, and: 'and' };
    expect(fabricateAlphabeticInteger(101, optionsWithAnd)).toBe('one hundred and one');
    expect(fabricateAlphabeticInteger(123, optionsWithAnd)).toBe('one hundred and twenty-three');
    expect(fabricateAlphabeticInteger(999, optionsWithAnd)).toBe('nine hundred and ninety-nine');
  });

  test('should handle thousands', () => {
    expect(fabricateAlphabeticInteger(1000, baseOptions)).toBe('one thousand');
    expect(fabricateAlphabeticInteger(2000, baseOptions)).toBe('two thousand');
    expect(fabricateAlphabeticInteger(5000, baseOptions)).toBe('five thousand');
  });

  test('should handle complex numbers with thousands', () => {
    expect(fabricateAlphabeticInteger(1234, baseOptions)).toBe(
      'one thousand two hundred thirty-four',
    );
    expect(fabricateAlphabeticInteger(9999, baseOptions)).toBe(
      'nine thousand nine hundred ninety-nine',
    );
  });

  test('should handle millions', () => {
    expect(fabricateAlphabeticInteger(1000000, baseOptions)).toBe('one million');
    expect(fabricateAlphabeticInteger(2500000, baseOptions)).toBe(
      'two million five hundred thousand',
    );
  });

  test('should handle billions', () => {
    expect(fabricateAlphabeticInteger(1000000000, baseOptions)).toBe('one billion');
    expect(fabricateAlphabeticInteger(1234567890, baseOptions)).toBe(
      'one billion two hundred thirty-four million five hundred sixty-seven thousand eight hundred ninety',
    );
  });

  test('should handle ordinal numbers', () => {
    const ordinalOptions: Numbering = { ...baseOptions, ordinal: true };
    expect(fabricateAlphabeticInteger(1, ordinalOptions)).toBe('first');
    expect(fabricateAlphabeticInteger(2, ordinalOptions)).toBe('second');
    expect(fabricateAlphabeticInteger(3, ordinalOptions)).toBe('third');
    expect(fabricateAlphabeticInteger(4, ordinalOptions)).toBe('fourth');
    expect(fabricateAlphabeticInteger(5, ordinalOptions)).toBe('fifth');
    expect(fabricateAlphabeticInteger(12, ordinalOptions)).toBe('twelfth');
    expect(fabricateAlphabeticInteger(20, ordinalOptions)).toBe('twentieth');
    expect(fabricateAlphabeticInteger(21, ordinalOptions)).toBe('twenty-first');
    expect(fabricateAlphabeticInteger(100, ordinalOptions)).toBe('one hundredth');
  });

  test('should handle hybrid output for integers', () => {
    const hybridOptions: Numbering = {
      ...baseOptions,
      output: { integer: 'hybrid', fraction: 'alphabetic' },
    };
    // Hybrid mode outputs numbers as digits for whole values
    expect(fabricateAlphabeticInteger(5, hybridOptions)).toBe('5');
    expect(fabricateAlphabeticInteger(42, hybridOptions)).toBe('42');
    expect(fabricateAlphabeticInteger(123, hybridOptions)).toBe('123');
  });

  test('should handle fractional values with decimal shift', () => {
    const decimalOptions: Numbering = { ...baseOptions, shift: 'decimal' };
    expect(fabricateAlphabeticInteger(1.5, decimalOptions)).toBe('one point five');
    expect(fabricateAlphabeticInteger(3.14, decimalOptions)).toBe('three point one four');
  });

  test('should handle fractional values without decimal shift', () => {
    expect(fabricateAlphabeticInteger(1.5, baseOptions)).toContain('one');
  });

  test('should handle large illion names', () => {
    expect(fabricateAlphabeticInteger(1e12, baseOptions)).toBe('one trillion');
    expect(fabricateAlphabeticInteger(1e15, baseOptions)).toBe('one quadrillion');
  });

  test('should handle negative numbers (processes absolute value)', () => {
    expect(fabricateAlphabeticInteger(-42, baseOptions)).toBe('forty-two');
  });

  test('should handle space as hyphen', () => {
    const spaceOptions: Numbering = { ...baseOptions, hyphen: ' ' };
    expect(fabricateAlphabeticInteger(21, spaceOptions)).toBe('twenty one');
    expect(fabricateAlphabeticInteger(99, spaceOptions)).toBe('ninety nine');
  });
});
