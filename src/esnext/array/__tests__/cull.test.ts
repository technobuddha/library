import { cull } from '../cull.ts';

describe('cull', () => {
  test('removes null and undefined values from array', () => {
    expect(Array.from(cull([1, null, 2, undefined, 3]))).toEqual([1, 2, 3]);
  });

  test('returns empty array if all values are null or undefined', () => {
    expect(Array.from(cull([null, undefined, undefined, null]))).toEqual([]);
  });

  test('returns original array if no null or undefined values', () => {
    expect(Array.from(cull([1, 2, 3]))).toEqual([1, 2, 3]);
  });

  test('works with string values', () => {
    expect(Array.from(cull(['a', null, 'b', undefined, 'c']))).toEqual(['a', 'b', 'c']);
  });

  test('works with boolean values', () => {
    expect(Array.from(cull([true, false, null, undefined]))).toEqual([true, false]);
  });

  test('does not remove falsy values except null/undefined', () => {
    expect(Array.from(cull([0, '', false, null, undefined]))).toEqual([0, '', false]);
  });
});
