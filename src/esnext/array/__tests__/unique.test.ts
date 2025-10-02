import { unique } from '../unique.ts';

describe('unique', () => {
  test('removes duplicate numbers', () => {
    expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
  });

  test('removes duplicate strings', () => {
    expect(unique(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
  });

  test('returns empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  test('returns original array if all elements are unique', () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('removes duplicates using transform function', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
    expect(unique(arr, (item) => item.id)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test('works with boolean values', () => {
    expect(unique([true, false, true, false])).toEqual([true, false]);
  });

  test('works with transform that returns constant', () => {
    expect(unique([1, 2, 3], () => 1)).toEqual([3]);
  });
});
