import { withIndex } from '../with-index.ts';

function* gen(): Generator<string> {
  yield 'p';
  yield 'q';
  yield 'r';
}

describe('withIndex', () => {
  test('yields [item, index] tuples for an array', () => {
    expect([...withIndex(['a', 'b', 'c'])]).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });

  test('returns an empty iterable for an empty array', () => {
    expect([...withIndex([])]).toEqual([]);
  });

  test('works with a single element', () => {
    expect([...withIndex(['x'])]).toEqual([['x', 0]]);
  });

  test('works with numbers', () => {
    expect([...withIndex([10, 20, 30])]).toEqual([
      [10, 0],
      [20, 1],
      [30, 2],
    ]);
  });

  test('works with a generator iterable', () => {
    expect([...withIndex(gen())]).toEqual([
      ['p', 0],
      ['q', 1],
      ['r', 2],
    ]);
  });

  test('index is zero-based', () => {
    const results = [...withIndex(['only'])];
    expect(results[0][1]).toBe(0);
  });
});
