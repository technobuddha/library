import { changed } from './changed.ts';

describe('changed', () => {
  test('returns false for two empty arrays', () => {
    expect(changed([], [])).toBeFalse();
  });

  test('returns true if array lengths differ', () => {
    expect(changed([1, 2, 3], [1, 2])).toBeTrue();
    expect(changed([], [1])).toBeTrue();
    expect(changed([1], [])).toBeTrue();
  });

  test('returns false for identical arrays', () => {
    expect(changed([1, 2, 3], [1, 2, 3])).toBeFalse();
    expect(changed(['a', 'b'], ['a', 'b'])).toBeFalse();
  });

  test('returns true for arrays with different elements', () => {
    expect(changed([1, 2, 3], [1, 2, 4])).toBeTrue();
    expect(changed(['a', 'b'], ['a', 'c'])).toBeTrue();
  });

  test('returns true if first element differs', () => {
    expect(changed([0, 2, 3], [1, 2, 3])).toBeTrue();
  });

  test('returns true if last element differs', () => {
    expect(changed([1, 2, 3], [1, 2, 4])).toBeTrue();
  });

  test('works with mixed types', () => {
    expect(changed([1, '2', true], [1, '2', true])).toBeFalse();
    expect(changed([1, '2', true], [1, '2', false])).toBeTrue();
  });

  test('works with nested arrays (shallow comparison)', () => {
    const arr1 = [1, [2, 3]];
    const arr2 = [1, [2, 3]];
    expect(changed(arr1, arr2)).toBeTrue(); // different references
    expect(changed(arr1, arr1)).toBeFalse();
  });
});
