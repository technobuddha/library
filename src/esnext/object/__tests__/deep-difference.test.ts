import { deepDifference } from '../deep-difference.ts';

describe('deepDifference', () => {
  test('returns null when no keys differ', () => {
    expect(deepDifference({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeNull();
  });

  test('returns the first differing top-level property name', () => {
    expect(deepDifference({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe('b');
  });

  test('returns the dotted nested path for nested value differences', () => {
    expect(deepDifference({ a: { b: 1, c: 2 } }, { a: { b: 1, c: 3 } })).toBe('a.c');
    expect(deepDifference({ a: { b: 1 } }, { a: { b: 2 } })).toBe('a.b');
  });

  test('returns the missing key when objects have different shapes', () => {
    expect(deepDifference({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe('b');
  });
});
