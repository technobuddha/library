import { toIterable } from '../to-iterable.ts';

function* generator(): Generator<number, void, unknown> {
  yield 1;
  yield 2;
  yield 3;
}

function testFunction(...args: unknown[]): unknown[] {
  return Array.from(toIterable(args));
}

describe('toIterable', () => {
  test('converts array to iterable', () => {
    const result = Array.from(toIterable([1, 2, 3]));
    expect(result).toEqual([1, 2, 3]);
  });

  test('converts single value to iterable yielding that value', () => {
    const result = Array.from(toIterable(42));
    expect(result).toEqual([42]);
  });

  test('converts null to iterable yielding null', () => {
    const result = Array.from(toIterable(null));
    expect(result).toEqual([null]);
  });

  test('converts undefined to iterable yielding undefined', () => {
    const result = Array.from(toIterable(undefined));
    expect(result).toEqual([undefined]);
  });

  test('converts object to iterable yielding that object', () => {
    const obj = { a: 1 };
    const result = Array.from(toIterable(obj));
    expect(result).toEqual([obj]);
  });

  test('handles empty array', () => {
    const result = Array.from(toIterable([]));
    expect(result).toEqual([]);
  });

  test('handles array of objects', () => {
    const arr = [{ a: 1 }, { b: 2 }];
    const result = Array.from(toIterable(arr));
    expect(result).toEqual(arr);
  });

  test('handles array of strings', () => {
    const result = Array.from(toIterable(['a', 'b', 'c']));
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('treats string as single value, not iterable of characters', () => {
    const result = Array.from(toIterable('hello'));
    expect(result).toEqual(['hello']);
    expect(result).not.toEqual(['h', 'e', 'l', 'l', 'o']);
  });

  test('treats empty string as single value', () => {
    const result = Array.from(toIterable(''));
    expect(result).toEqual(['']);
  });

  test('converts Set to iterable', () => {
    const set = new Set([1, 2, 3]);
    const result = Array.from(toIterable(set));
    expect(result).toEqual([1, 2, 3]);
  });

  test('converts empty Set to iterable', () => {
    const set = new Set<number>();
    const result = Array.from(toIterable(set));
    expect(result).toEqual([]);
  });

  test('converts Map to iterable of entries', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const result = Array.from(toIterable(map));
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  test('converts generator to iterable', () => {
    const result = Array.from(toIterable(generator()));
    expect(result).toEqual([1, 2, 3]);
  });

  test('converts custom iterable to iterable', () => {
    const iterable = {
      *[Symbol.iterator]() {
        yield 'x';
        yield 'y';
        yield 'z';
      },
    };
    const result = Array.from(toIterable(iterable));
    expect(result).toEqual(['x', 'y', 'z']);
  });

  test('converts array-like objects to iterable', () => {
    const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
    const result = Array.from(toIterable(arrayLike));
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('converts array-like with length 0 to empty iterable', () => {
    const arrayLike = { length: 0 };
    const result = Array.from(toIterable(arrayLike));
    expect(result).toEqual([]);
  });

  test('handles arguments object as array-like', () => {
    const result = testFunction(1, 2, 3);
    expect(result).toEqual([1, 2, 3]);
  });

  test('handles array-like with non-sequential indices', () => {
    const arrayLike = { length: 5, 0: 'a', 2: 'c', 4: 'e' };
    const result = Array.from(toIterable(arrayLike));
    expect(result).toEqual(['a', undefined, 'c', undefined, 'e']);
  });

  test('handles array-like with negative length as single value', () => {
    const arrayLike = { length: -1, 0: 'a', 1: 'b' };
    const result = Array.from(toIterable(arrayLike));
    // Negative length is not valid for array-like, so it's treated as a single value
    expect(result).toEqual([arrayLike]);
  });

  test('preserves undefined elements in arrays', () => {
    const result = Array.from(toIterable([1, undefined, 3]));
    expect(result).toEqual([1, undefined, 3]);
  });

  test('preserves null elements in arrays', () => {
    const result = Array.from(toIterable([1, null, 3]));
    expect(result).toEqual([1, null, 3]);
  });

  test('works with nested arrays', () => {
    const nested = [
      [1, 2],
      [3, 4],
    ];
    const result = Array.from(toIterable(nested));
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('works with mixed type arrays', () => {
    const mixed = [1, 'a', true, null, undefined, { x: 1 }];
    const result = Array.from(toIterable(mixed));
    expect(result).toEqual(mixed);
  });

  test('returns a generator', () => {
    const gen = toIterable([1, 2, 3]);
    expect(gen).toHaveProperty('next');
    expect(typeof gen.next).toBe('function');
  });

  test('generator can be iterated multiple times by creating new instances', () => {
    const arr = [1, 2, 3];
    const result1 = Array.from(toIterable(arr));
    const result2 = Array.from(toIterable(arr));
    expect(result1).toEqual([1, 2, 3]);
    expect(result2).toEqual([1, 2, 3]);
  });

  test('handles boolean values', () => {
    expect(Array.from(toIterable(true))).toEqual([true]);
    expect(Array.from(toIterable(false))).toEqual([false]);
  });

  test('handles number zero', () => {
    const result = Array.from(toIterable(0));
    expect(result).toEqual([0]);
  });

  test('handles negative numbers', () => {
    const result = Array.from(toIterable(-42));
    expect(result).toEqual([-42]);
  });

  test('handles BigInt values', () => {
    const result = Array.from(toIterable(123n));
    expect(result).toEqual([123n]);
  });

  test('handles Symbol values', () => {
    const sym = Symbol('test');
    const result = Array.from(toIterable(sym));
    expect(result).toEqual([sym]);
  });

  test('converts typed arrays to iterable', () => {
    const uint8 = new Uint8Array([1, 2, 3]);
    const result = Array.from(toIterable(uint8));
    expect(result).toEqual([1, 2, 3]);
  });

  test('converts Int32Array to iterable', () => {
    const int32 = new Int32Array([10, 20, 30]);
    const result = Array.from(toIterable(int32));
    expect(result).toEqual([10, 20, 30]);
  });

  test('handles array with single element', () => {
    const result = Array.from(toIterable([42]));
    expect(result).toEqual([42]);
  });

  test('handles large arrays', () => {
    const large = Array.from({ length: 1000 }, (_, i) => i);
    const result = Array.from(toIterable(large));
    expect(result).toHaveLength(1000);
    expect(result[0]).toBe(0);
    expect(result[999]).toBe(999);
  });
});
