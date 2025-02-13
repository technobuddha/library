import { parseRoman, toRoman } from './roman-numeral.js';

describe('parseRoman', () => {
  test('should parse roman numbers', () => {
    expect(parseRoman('iv')).toBe(4);
    expect(parseRoman('IV')).toBe(4);

    expect(parseRoman('mmxiii')).toBe(2013);
    expect(parseRoman('MMXIII')).toBe(2013);

    expect(parseRoman('MCMXCVI')).toBe(1996);
  });

  test('should throw on bad roman numbers', () => {
    expect(() => parseRoman('foo')).toThrow();
  });
});

describe('toRoman', () => {
  test('should convert numbers to roman numerals', () => {
    expect(toRoman(4)).toBe('IV');
    expect(toRoman(2013)).toBe('MMXIII');
    expect(toRoman(1996)).toBe('MCMXCVI');
  });
});
