import { zipperMerge } from '../zipper-merge.ts';

describe('zipperMerge', () => {
  test('merges two arrays of equal length', () => {
    expect(Array.from(zipperMerge([1, 2, 3], ['a', 'b', 'c']))).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  test('merges two ary.rays of different lengths', () => {
    expect(Array.from(zipperMerge([1, 2], ['a', 'b', 'c']))).toEqual([
      [1, 'a'],
      [2, 'b'],
      [undefined, 'c'],
    ]);
    expect(Array.from(zipperMerge([1, 2, 3], ['a']))).toEqual([
      [1, 'a'],
      [2, undefined],
      [3, undefined],
    ]);
  });

  test('merges three arrays', () => {
    expect(Array.from(zipperMerge([1, 2], ['a', 'b', 'c'], [true, false, true, false]))).toEqual([
      [1, 'a', true],
      [2, 'b', false],
      [undefined, 'c', true],
      [undefined, undefined, false],
    ]);
  });

  test('merges four arrays', () => {
    expect(
      Array.from(zipperMerge([1], ['a', 'b'], [true, false, true], [null, undefined, 0, 1])),
    ).toEqual([
      [1, 'a', true, null],
      [undefined, 'b', false, undefined],
      [undefined, undefined, true, 0],
      [undefined, undefined, undefined, 1],
    ]);
  });

  test('merges five arrays', () => {
    expect(
      Array.from(
        zipperMerge([1], ['a'], [true, false], [null, undefined, 0], ['x', 'y', 'z', 'w']),
      ),
    ).toEqual([
      [1, 'a', true, null, 'x'],
      [undefined, undefined, false, undefined, 'y'],
      [undefined, undefined, undefined, 0, 'z'],
      [undefined, undefined, undefined, undefined, 'w'],
    ]);
  });

  test('works with empty arrays', () => {
    expect(Array.from(zipperMerge([], [], []))).toEqual([]);
    expect(Array.from(zipperMerge([1, 2], []))).toEqual([
      [1, undefined],
      [2, undefined],
    ]);
    expect(Array.from(zipperMerge([], [1, 2]))).toEqual([
      [undefined, 1],
      [undefined, 2],
    ]);
  });

  test('works with single array', () => {
    expect(Array.from(zipperMerge([1, 2, 3]))).toEqual([[1], [2], [3]]);
    expect(Array.from(zipperMerge([]))).toEqual([]);
  });

  test('works with no arrays', () => {
    expect(Array.from(zipperMerge())).toEqual([]);
  });
});
