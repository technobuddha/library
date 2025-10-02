import { range } from '../range.ts';

describe('range', () => {
  test('generates ascending number range', () => {
    expect(Array.from(range(1, 5))).toEqual([1, 2, 3, 4, 5]);
  });

  test('generates descending number range', () => {
    expect(Array.from(range(5, 1))).toEqual([5, 4, 3, 2, 1]);
  });

  test('generates number range with custom positive step', () => {
    expect(Array.from(range(1, 5, 2))).toEqual([1, 3, 5]);
  });

  test('generates number range with custom negative step', () => {
    expect(Array.from(range(5, 1, -2))).toEqual([5, 3, 1]);
  });

  test('generates ascending bigint range', () => {
    expect(Array.from(range(1n, 3n))).toEqual([1n, 2n, 3n]);
  });

  test('generates descending bigint range', () => {
    expect(Array.from(range(3n, 1n))).toEqual([3n, 2n, 1n]);
  });

  test('generates bigint range with custom step', () => {
    expect(Array.from(range(1n, 5n, 2n))).toEqual([1n, 3n, 5n]);
    expect(Array.from(range(5n, 1n, -2n))).toEqual([5n, 3n, 1n]);
  });

  test('returns empty for invalid step direction (bigint)', () => {
    expect(Array.from(range(1n, 5n, -1n))).toEqual([]);
    expect(Array.from(range(5n, 1n, 1n))).toEqual([]);
  });

  test('generates ascending string range', () => {
    expect(Array.from(range('a', 'e'))).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('generates descending string range', () => {
    expect(Array.from(range('e', 'a'))).toEqual(['e', 'd', 'c', 'b', 'a']);
  });

  test('returns empty array for invalid parameters', () => {
    expect(Array.from(range(1, 5, -1))).toEqual([]);
    expect(Array.from(range(5, 1, 1))).toEqual([]);

    expect(Array.from(range(1n, 5n, -1n))).toEqual([]);
    expect(Array.from(range(5n, 1n, 1n))).toEqual([]);

    expect(Array.from(range('', ''))).toEqual([]);
    expect(Array.from(range('ab', 'cd'))).toEqual([]);
  });
});
