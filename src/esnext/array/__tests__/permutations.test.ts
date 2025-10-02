/**
 * @group Array
 * @category Combinatorics
 * Unit tests for permutations function.
 */
import { permutations } from '../permutations.ts';

describe('permutations', () => {
  test('generates all permutations of length 2', () => {
    const result = Array.from(permutations([1, 2, 3], 2));
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
    ]);
  });

  test('generates all permutations of full length', () => {
    const result = Array.from(permutations([1, 2, 3]));
    expect(result).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });

  test('returns empty for empty array', () => {
    const result = Array.from(permutations([], 0));
    expect(result).toEqual([[]]);
  });

  test('throws if r > array.length', () => {
    expect(() => Array.from(permutations([1, 2], 3))).toThrow(TypeError);
  });

  test('works with strings', () => {
    const result = Array.from(permutations(['a', 'b'], 2));
    expect(result).toEqual([
      ['a', 'b'],
      ['b', 'a'],
    ]);
  });

  test('works with objects', () => {
    const objs = [{ x: 1 }, { x: 2 }];
    const result = Array.from(permutations(objs, 2));
    expect(result).toEqual([
      [objs[0], objs[1]],
      [objs[1], objs[0]],
    ]);
  });
});
