// cspell:ignore mmxiii MCMXCVI MMMCMXCIX I̅I̅XIII I̅CI̅XCVI V̅DLV V̿I̿I̿D̅C̅C̅L̅X̅X̅V̅I̅I̅DCCLXXVII D̿C̿C̿C̿X̿C̿I̿X̿C̅I̿X̅C̅I̅X̅CI̅XCIX

import { parseRoman, toRoman } from './roman-numeral.ts';

describe('parseRoman', () => {
  test('should parse roman numbers', () => {
    expect(parseRoman('iv')).toBe(4);
    expect(parseRoman('IV')).toBe(4);

    expect(parseRoman('mmxiii')).toBe(2013);
    expect(parseRoman('MMXIII')).toBe(2013);
    expect(parseRoman('MCMXCVI')).toBe(1996);
  });

  test('should return NaN on bad roman numbers', () => {
    expect(parseRoman('foo')).toBeNaN();
  });
});

describe('toRoman', () => {
  describe('standard', () => {
    test('should convert numbers to roman numerals', () => {
      expect(toRoman(4)).toBe('IV');
      expect(toRoman(2013)).toBe('MMXIII');
      expect(toRoman(1996)).toBe('MCMXCVI');
      expect(toRoman(3999)).toBe('MMMCMXCIX');
    });

    test('should throw on out of range numbers', () => {
      expect(() => toRoman(0)).toThrow(RangeError);
      expect(() => toRoman(-1)).toThrow(RangeError);
      expect(() => toRoman(3.14)).toThrow(RangeError);
      expect(() => toRoman(4000)).toThrow(RangeError);
    });
  });

  describe('apostrophus', () => {
    test('should convert numbers to roman numerals with apostrophus', () => {
      expect(toRoman(4, { format: 'apostrophus' })).toBe('IV');
      expect(toRoman(2013, { format: 'apostrophus' })).toBe('ↀↀXIII');
      expect(toRoman(1996, { format: 'apostrophus' })).toBe('ↀCↀXCVI');
      expect(toRoman(5555, { format: 'apostrophus' })).toBe('ↁDLV');
      expect(toRoman(399999, { format: 'apostrophus' })).toBe('ↈↈↈↂↈↀↂCↀXCIX');
    });

    test('should throw on out of range numbers', () => {
      expect(() => toRoman(0, { format: 'apostrophus' })).toThrow(RangeError);
      expect(() => toRoman(-1, { format: 'apostrophus' })).toThrow(RangeError);
      expect(() => toRoman(3.14, { format: 'apostrophus' })).toThrow(RangeError);
      expect(() => toRoman(400000, { format: 'apostrophus' })).toThrow(RangeError);
    });
  });

  describe('vinculum', () => {
    test('should convert numbers to roman numerals with vinculum', () => {
      expect(toRoman(4, { format: 'vinculum' })).toBe('IV');
      expect(toRoman(2013, { format: 'vinculum' })).toBe('I̅I̅XIII');
      expect(toRoman(1996, { format: 'vinculum' })).toBe('I̅CI̅XCVI');
      expect(toRoman(5555, { format: 'vinculum' })).toBe('V̅DLV');
      expect(toRoman(7777777, { format: 'vinculum' })).toBe('V̿I̿I̿D̅C̅C̅L̅X̅X̅V̅I̅I̅DCCLXXVII');
      expect(toRoman(899999999, { format: 'vinculum' })).toBe('D̿C̿C̿C̿X̿C̿I̿X̿C̅I̿X̅C̅I̅X̅CI̅XCIX');
    });

    test('should throw on out of range numbers', () => {
      expect(() => toRoman(0, { format: 'vinculum' })).toThrow(RangeError);
      expect(() => toRoman(-1, { format: 'vinculum' })).toThrow(RangeError);
      expect(() => toRoman(3.14, { format: 'vinculum' })).toThrow(RangeError);
      expect(() => toRoman(900000000, { format: 'vinculum' })).toThrow(RangeError);
    });
  });
});
