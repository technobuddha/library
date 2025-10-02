import { ensureArray } from '../ensure-array.ts';

describe('ensureArray', () => {
  test('returns the same array if input is already an array', () => {
    const arr = [1, 2, 3];
    expect(ensureArray(arr)).toBe(arr);
  });

  test('wraps a non-array value in an array', () => {
    expect(ensureArray(42)).toEqual([42]);
    expect(ensureArray('hello')).toEqual(['hello']);
    expect(ensureArray(null)).toEqual([null]);
    expect(ensureArray(undefined)).toEqual([undefined]);
  });

  test('wraps an object in an array', () => {
    const obj = { key: 'value' };
    expect(ensureArray(obj)).toEqual([obj]);
  });

  test('handles empty array', () => {
    const arr: number[] = [];
    expect(ensureArray(arr)).toBe(arr);
    expect(ensureArray(arr)).toEqual([]);
  });

  test('wraps boolean values in an array', () => {
    expect(ensureArray(true)).toEqual([true]);
    expect(ensureArray(false)).toEqual([false]);
  });

  test('wraps zero in an array', () => {
    expect(ensureArray(0)).toEqual([0]);
  });

  test('wraps empty string in an array', () => {
    expect(ensureArray('')).toEqual(['']);
  });

  test('handles arrays with mixed types', () => {
    const arr = [1, 'two', { three: 3 }, null, undefined];
    expect(ensureArray(arr)).toBe(arr);
  });

  test('handles array-like object', () => {
    const arrayLike = { 0: 'a', 1: 'b', length: 2 };
    expect(ensureArray(arrayLike)).toEqual(arrayLike);
  });
});
