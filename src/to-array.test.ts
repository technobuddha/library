import { toArray } from './to-array.ts';

describe('toArray', () => {
  test('returns the same array if input is already an array', () => {
    const arr = [1, 2, 3];
    expect(toArray(arr)).toBe(arr);
  });

  test('wraps a non-array value in an array', () => {
    expect(toArray(42)).toEqual([42]);
    expect(toArray('foo')).toEqual(['foo']);
    expect(toArray(null)).toEqual([null]);
    expect(toArray(undefined)).toEqual([undefined]);
    expect(toArray({ a: 1 })).toEqual([{ a: 1 }]);
  });

  test('handles empty array', () => {
    expect(toArray([])).toEqual([]);
  });

  test('handles array of objects', () => {
    const arr = [{ a: 1 }, { b: 2 }];
    expect(toArray(arr)).toBe(arr);
  });

  test('handles array of strings', () => {
    const arr = ['a', 'b', 'c'];
    expect(toArray(arr)).toBe(arr);
  });
});
