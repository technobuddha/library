import { mode } from './mode.ts';

describe('mode', () => {
  test('returns the mode for an array of numbers', () => {
    expect(mode([1, 2, 2, 3, 4])).toBe(2);
  });

  test('returns the mode for an array of strings', () => {
    expect(mode(['a', 'b', 'b', 'c'])).toBe('b');
  });

  test('returns the first encountered mode when multiple elements have the same frequency', () => {
    expect(mode([1, 2, 1, 2])).toBe(1);
    expect(mode(['x', 'y', 'x', 'y'])).toBe('x');
  });

  test('returns the element itself for a single-element array', () => {
    expect(mode([42])).toBe(42);
    expect(mode(['only'])).toBe('only');
  });

  test('returns undefined for an empty array', () => {
    expect(mode([])).toBeUndefined();
  });

  test('works with arrays of booleans', () => {
    expect(mode([true, false, true, true, false])).toBeTrue();
  });

  test('works with arrays of objects by reference', () => {
    const a = { x: 1 };
    const b = { x: 1 };
    expect(mode([a, b, a])).toBe(a);
  });
});
