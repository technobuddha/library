import { conjoin } from './conjoin.ts';

describe('conjoin', () => {
  test('should handle basic functionality', () => {
    expect(conjoin([])).toBe('');
    expect(conjoin(['a'])).toBe('a');
    expect(conjoin(['a', 'b'])).toBe('a and b');
    expect(conjoin(['a', 'b', 'c'])).toBe('a, b, and c');
    expect(conjoin(['a', 'b', 'c', 'd', 'e', 'f'])).toBe('a, b, c, d, e, and f');
  });

  test('should handle oxford commas', () => {
    expect(conjoin([], { oxford: false })).toBe('');
    expect(conjoin(['a'], { oxford: false })).toBe('a');
    expect(conjoin(['a', 'b'], { oxford: false })).toBe('a and b');
    expect(conjoin(['a', 'b', 'c'], { oxford: false })).toBe('a, b and c');
    expect(conjoin(['a', 'b', 'c', 'd', 'e', 'f'], { oxford: false })).toBe('a, b, c, d, e and f');
  });

  test('should handle conjunctions', () => {
    expect(conjoin([], { conjunction: 'or' })).toBe('');
    expect(conjoin(['a'], { conjunction: 'or' })).toBe('a');
    expect(conjoin(['a', 'b'], { conjunction: 'or' })).toBe('a or b');
    expect(conjoin(['a', 'b', 'c'], { conjunction: 'or' })).toBe('a, b, or c');
    expect(conjoin(['a', 'b', 'c', 'd', 'e', 'f'], { conjunction: 'or' })).toBe(
      'a, b, c, d, e, or f',
    );
  });

  test('should handle separators', () => {
    expect(conjoin([], { separator: ';' })).toBe('');
    expect(conjoin(['a'], { separator: ';' })).toBe('a');
    expect(conjoin(['a', 'b'], { separator: ';' })).toBe('a and b');
    expect(conjoin(['a', 'b', 'c'], { separator: ';' })).toBe('a; b; and c');
    expect(conjoin(['a', 'b', 'c', 'd', 'e', 'f'], { separator: ';' })).toBe(
      'a; b; c; d; e; and f',
    );
  });
});
