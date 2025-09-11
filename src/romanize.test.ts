// cspell:ignore mmxiii MCMXCVI MMMCMXCIX I̅I̅XIII I̅CI̅XCVI V̅DLV V̿I̿I̿D̅C̅C̅L̅X̅X̅V̅I̅I̅DCCLXXVII D̿C̿C̿C̿X̿C̿I̿X̿C̅I̿X̅C̅I̅X̅CI̅XCIX

import { romanize } from './romanize.ts';

describe('romanize', () => {
  test('should convert numbers to roman numerals', () => {
    expect(romanize(4)).toBe('IV');
    expect(romanize(2013)).toBe('MMXIII');
    expect(romanize(1996)).toBe('MCMXCVI');
    expect(romanize(3999)).toBe('MMMCMXCIX');
  });

  test('should throw on out of range numbers', () => {
    expect(() => romanize(0)).toThrow(RangeError);
    expect(() => romanize(-1)).toThrow(RangeError);
    expect(() => romanize(3.14)).toThrow(RangeError);
    expect(() => romanize(4000)).toThrow(RangeError);
  });

  test('apostrophus should convert numbers to roman numerals with apostrophus', () => {
    expect(romanize(4, { format: 'apostrophus' })).toBe('IV');
    expect(romanize(2013, { format: 'apostrophus' })).toBe('ↀↀXIII');
    expect(romanize(1996, { format: 'apostrophus' })).toBe('ↀCↀXCVI');
    expect(romanize(5555, { format: 'apostrophus' })).toBe('ↁDLV');
    expect(romanize(399999, { format: 'apostrophus' })).toBe('ↈↈↈↂↈↀↂCↀXCIX');
  });

  test('apostrophus should throw on out of range numbers', () => {
    expect(() => romanize(0, { format: 'apostrophus' })).toThrow(RangeError);
    expect(() => romanize(-1, { format: 'apostrophus' })).toThrow(RangeError);
    expect(() => romanize(3.14, { format: 'apostrophus' })).toThrow(RangeError);
    expect(() => romanize(400000, { format: 'apostrophus' })).toThrow(RangeError);
  });

  test('vinculum should convert numbers to roman numerals with vinculum', () => {
    expect(romanize(4, { format: 'vinculum' })).toBe('IV');
    expect(romanize(2013, { format: 'vinculum' })).toBe('I̅I̅XIII');
    expect(romanize(1996, { format: 'vinculum' })).toBe('I̅CI̅XCVI');
    expect(romanize(5555, { format: 'vinculum' })).toBe('V̅DLV');
    expect(romanize(7777777, { format: 'vinculum' })).toBe('V̿I̿I̿D̅C̅C̅L̅X̅X̅V̅I̅I̅DCCLXXVII');
    expect(romanize(899999999, { format: 'vinculum' })).toBe('D̿C̿C̿C̿X̿C̿I̿X̿C̅I̿X̅C̅I̅X̅CI̅XCIX');
  });

  test('vinculum should throw on out of range numbers', () => {
    expect(() => romanize(0, { format: 'vinculum' })).toThrow(RangeError);
    expect(() => romanize(-1, { format: 'vinculum' })).toThrow(RangeError);
    expect(() => romanize(3.14, { format: 'vinculum' })).toThrow(RangeError);
    expect(() => romanize(900000000, { format: 'vinculum' })).toThrow(RangeError);
  });
});
