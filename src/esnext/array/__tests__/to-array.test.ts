import { toArray } from '../to-array.ts';

function* generator(): Generator<number, void, unknown> {
  yield 1;
  yield 2;
  yield 3;
}

function testFunction(...args: unknown[]): unknown[] {
  return toArray(args);
}

describe('toArray', () => {
  test('returns the same array if input is already an array', () => {
    const arr = [1, 2, 3];
    expect(toArray(arr)).toBe(arr);
  });

  test('wraps a non-array value in an array', () => {
    expect(toArray(42)).toEqual([42]);
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

  test('wraps string as a single element array', () => {
    expect(toArray('hello')).toEqual(['hello']);
    expect(toArray('')).toEqual(['']);
  });

  test('converts Map to array of entries', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    expect(toArray(map)).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  test('converts generator to array', () => {
    expect(toArray(generator())).toEqual([1, 2, 3]);
  });

  test('converts custom iterable to array', () => {
    const iterable = {
      *[Symbol.iterator]() {
        yield 'x';
        yield 'y';
        yield 'z';
      },
    };
    expect(toArray(iterable)).toEqual(['x', 'y', 'z']);
  });

  test('converts array-like objects to array', () => {
    const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
    expect(toArray(arrayLike)).toEqual(['a', 'b', 'c']);
  });

  test('converts array-like with length 0 to empty array', () => {
    const arrayLike = { length: 0 };
    expect(toArray(arrayLike)).toEqual([]);
  });

  test('handles arguments object as array-like', () => {
    expect(testFunction(1, 2, 3)).toEqual([1, 2, 3]);
  });
});
