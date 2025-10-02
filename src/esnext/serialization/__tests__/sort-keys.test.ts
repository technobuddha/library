import { sortKeys } from '../sort-keys.ts';

describe('sortKeys', () => {
  test('returns primitives as-is', () => {
    expect(sortKeys(42)).toBe(42);
    expect(sortKeys('hello')).toBe('hello');
    expect(sortKeys(true)).toBeTrue();
    expect(sortKeys(null)).toBeNull();
  });

  test('returns arrays as-is', () => {
    expect(sortKeys([3, 2, 1])).toEqual([3, 2, 1]);
    expect(sortKeys(['b', 'a'])).toEqual(['b', 'a']);
  });

  test('sorts top-level object keys', () => {
    const result = sortKeys({ b: 2, a: 1, c: 3 });
    expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('sorts nested object keys recursively', () => {
    const input = {
      z: 1,
      a: {
        d: 4,
        b: 2,
        c: 3,
      },
      m: {
        y: 2,
        x: 1,
      },
    };

    const result = sortKeys(input);

    // Check top-level keys are sorted
    expect(Object.keys(result)).toEqual(['a', 'm', 'z']);

    // Check nested object keys are sorted
    expect(Object.keys(result.a)).toEqual(['b', 'c', 'd']);
    expect(Object.keys(result.m)).toEqual(['x', 'y']);

    // Verify values are preserved
    expect(result).toEqual({
      a: { b: 2, c: 3, d: 4 },
      m: { x: 1, y: 2 },
      z: 1,
    });
  });

  test('handles objects with array values', () => {
    const result = sortKeys({
      b: [3, 2, 1],
      a: [1, 2, 3],
    });

    expect(Object.keys(result)).toEqual(['a', 'b']);
    expect(result).toEqual({
      a: [1, 2, 3],
      b: [3, 2, 1],
    });
  });

  test('handles deeply nested structures', () => {
    const input = {
      c: {
        b: {
          d: 4,
          a: 1,
        },
        a: 2,
      },
      a: 0,
    };

    const result = sortKeys(input);

    // Check all levels have sorted keys
    expect(Object.keys(result)).toEqual(['a', 'c']);
    expect(Object.keys(result.c)).toEqual(['a', 'b']);
    expect(Object.keys(result.c.b)).toEqual(['a', 'd']);

    expect(result).toEqual({
      a: 0,
      c: {
        a: 2,
        b: {
          a: 1,
          d: 4,
        },
      },
    });
  });

  test('handles empty objects and arrays', () => {
    expect(sortKeys({})).toEqual({});
    expect(sortKeys([])).toEqual([]);

    const result = sortKeys({ b: {}, a: [] });
    expect(Object.keys(result)).toEqual(['a', 'b']);
    expect(result).toEqual({ a: [], b: {} });
  });

  test('does not mutate the original object', () => {
    const input = { b: 2, a: 1 };
    const originalKeys = Object.keys(input);
    const result = sortKeys(input);

    // Original object keys unchanged
    expect(Object.keys(input)).toEqual(originalKeys);
    // Result has sorted keys
    expect(Object.keys(result)).toEqual(['a', 'b']);
  });

  test('sorts keys alphabetically with special characters', () => {
    const result = sortKeys({
      'z-key': 1,
      'a_key': 2,
      'A-KEY': 3,
      '1key': 4,
    });

    expect(Object.keys(result)).toEqual(['1key', 'a_key', 'A-KEY', 'z-key']);
  });

  test('verifies key order using JSON.stringify', () => {
    const result = sortKeys({ c: 3, a: 1, b: 2 });
    expect(JSON.stringify(result)).toBe('{"a":1,"b":2,"c":3}');
  });
});
