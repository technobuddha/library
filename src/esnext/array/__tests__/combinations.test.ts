import { combinations } from '../combinations.ts';

describe('combinations', () => {
  test('generates all combinations of length 2 from 3 elements', () => {
    const result = Array.from(combinations([1, 2, 3], 2));
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });

  test('generates all combinations of length 2 from 4 elements', () => {
    const result = Array.from(combinations([1, 2, 3, 4], 2));
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);
  });

  test('generates all combinations of length 3 from 4 elements', () => {
    const result = Array.from(combinations([1, 2, 3, 4], 3));
    expect(result).toEqual([
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
    ]);
  });

  test('generates all combinations of length 3 from 5 elements', () => {
    const result = Array.from(combinations(['a', 'b', 'c', 'd', 'e'], 3));
    expect(result).toEqual([
      ['a', 'b', 'c'],
      ['a', 'b', 'd'],
      ['a', 'b', 'e'],
      ['a', 'c', 'd'],
      ['a', 'c', 'e'],
      ['a', 'd', 'e'],
      ['b', 'c', 'd'],
      ['b', 'c', 'e'],
      ['b', 'd', 'e'],
      ['c', 'd', 'e'],
    ]);
  });

  test('generates single element combinations', () => {
    const result = Array.from(combinations([1, 2, 3], 1));
    expect(result).toEqual([[1], [2], [3]]);
  });

  test('generates all combinations of full length', () => {
    const result = Array.from(combinations([1, 2, 3]));
    expect(result).toEqual([[1, 2, 3]]);
  });

  test('handles single element array with size 1', () => {
    const result = Array.from(combinations([42], 1));
    expect(result).toEqual([[42]]);
  });

  test('handles single element array with default size', () => {
    const result = Array.from(combinations([42]));
    expect(result).toEqual([[42]]);
  });

  test('returns empty for empty array with size 0', () => {
    const result = Array.from(combinations([], 0));
    expect(result).toEqual([[]]);
  });

  test('throws TypeError if size exceeds array length', () => {
    expect(() => Array.from(combinations([1, 2], 3))).toThrow(TypeError);
    expect(() => Array.from(combinations([1, 2], 3))).toThrow(
      'The size of the subsequences should not exceed the length of the array.',
    );
  });

  test('works with string elements', () => {
    const result = Array.from(combinations(['a', 'b', 'c'], 2));
    expect(result).toEqual([
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'c'],
    ]);
  });

  test('works with object elements', () => {
    const objs = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = Array.from(combinations(objs, 2));
    expect(result).toEqual([
      [objs[0], objs[1]],
      [objs[0], objs[2]],
      [objs[1], objs[2]],
    ]);
  });

  test('works with mixed type elements', () => {
    const result = Array.from(combinations([1, 'a', true, null], 2));
    expect(result).toHaveLength(6);
    expect(result).toContainEqual([1, 'a']);
    expect(result).toContainEqual([1, true]);
    expect(result).toContainEqual([1, null]);
    expect(result).toContainEqual(['a', true]);
    expect(result).toContainEqual(['a', null]);
    expect(result).toContainEqual([true, null]);
  });

  test('generates correct number of combinations', () => {
    // C(n, k) = n! / (k! * (n - k)!)
    // C(5, 2) = 5! / (2! * 3!) = 10
    const result = Array.from(combinations([1, 2, 3, 4, 5], 2));
    expect(result).toHaveLength(10);

    // C(6, 3) = 6! / (3! * 3!) = 20
    const result2 = Array.from(combinations([1, 2, 3, 4, 5, 6], 3));
    expect(result2).toHaveLength(20);
  });

  test('preserves element order within combinations', () => {
    const result = Array.from(combinations([5, 3, 8, 1], 2));
    // Each combination should maintain the relative order from the original array
    expect(result).toEqual([
      [5, 3],
      [5, 8],
      [5, 1],
      [3, 8],
      [3, 1],
      [8, 1],
    ]);
  });
});
