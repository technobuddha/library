import { chain } from '../chain.ts';

describe('chain', () => {
  test('chains multiple arrays', () => {
    const a = [1, 2];
    const b = [3, 4];
    const c = [5, 6];
    const result = Array.from(chain(a, b, c));
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('chains empty arrays', () => {
    const a: number[] = [];
    const b: number[] = [];
    const result = Array.from(chain(a, b));
    expect(result).toEqual([]);
  });

  test('chains arrays and sets', () => {
    const a = [1, 2];
    const b = new Set([3, 4]);
    const result = Array.from(chain(a, b));
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('chains single iterable', () => {
    const a = [1, 2, 3];
    const result = Array.from(chain(a));
    expect(result).toEqual([1, 2, 3]);
  });

  test('chains no iterables', () => {
    const result = Array.from(chain());
    expect(result).toEqual([]);
  });

  test('chains with strings', () => {
    const a: Iterable<string> = 'ab';
    const b: Iterable<string> = 'cd';
    const result = Array.from(chain(a, b));
    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  test('chains with mixed types', () => {
    const a: Iterable<unknown> = [1, 2];
    const b: Iterable<unknown> = ['a', 'b'];
    const result = Array.from(chain(a, b));
    expect(result).toEqual([1, 2, 'a', 'b']);
  });
});
