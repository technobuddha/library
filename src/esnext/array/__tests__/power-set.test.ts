/**
 * @group Iteration
 * @category Combinatorial
 * Unit tests for powerSet function.
 */
import { powerSet } from '../power-set.ts';

describe('powerSet', () => {
  test('generates power set for 3 elements', () => {
    const result = Array.from(powerSet(['a', 'b', 'c']));
    expect(result).toEqual([
      [],
      ['a'],
      ['b'],
      ['c'],
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'c'],
      ['a', 'b', 'c'],
    ]);
  });

  test('generates power set for empty array', () => {
    const result = Array.from(powerSet([]));
    expect(result).toEqual([[]]);
  });

  test('generates power set for single element', () => {
    const result = Array.from(powerSet([42]));
    expect(result).toEqual([[], [42]]);
  });

  test('works with objects', () => {
    const objs = [{ x: 1 }, { x: 2 }];
    const result = Array.from(powerSet(objs));
    expect(result).toEqual([[], [objs[0]], [objs[1]], [objs[0], objs[1]]]);
  });
});
