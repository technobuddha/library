import { matchCase } from './match-case.ts';

describe('matchCase', () => {
  test('should match case', () => {
    expect(matchCase('abcDef', 'xyz')).toBe('abcdef');
    expect(matchCase('abcDef', 'XYZ')).toBe('ABCDEF');
    expect(matchCase('abcDef', 'Xyz')).toBe('Abcdef');
    expect(matchCase('abcDef', 'xYZ')).toBe('abcdef');
    expect(matchCase('abcDef', 'XyZ')).toBe('Abcdef');
  });

  test('should handle empty string', () => {
    expect(matchCase('abc', '')).toBe('abc');
    expect(matchCase('', 'abc')).toBe('');
  });
});
