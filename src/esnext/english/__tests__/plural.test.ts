import { plural } from '../plural.ts';

describe('plural', () => {
  test('should handle simple plurals', () => {
    expect(plural('book')).toBe('books');
  });

  test('should handle prefixes', () => {
    expect(plural('non-giraffe')).toBe('non-giraffes');
  });

  test('should handle suffixes', () => {
    expect(plural('mother-in-law')).toBe('mothers-in-law');
  });

  test('should handle uncountables', () => {
    expect(plural('pants')).toBe('pants');
    expect(plural('witchcraft')).toBe('witchcraft');
  });

  test('should handle irregulars', () => {
    expect(plural('die')).toBe('dice');
  });

  test('should handle quantities', () => {
    expect(plural('die', 1, false)).toBe('die');
    expect(plural('die', 2, false)).toBe('dice');
    expect(plural('die', 1, true)).toBe('1 die');
    expect(plural('die', 2, true)).toBe('2 dice');
  });
});
