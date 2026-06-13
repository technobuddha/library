import { cull } from '../cull.ts';

function* nullableNumbers(): Generator<number | null | undefined> {
  yield 1;
  yield null;
  yield 2;
  yield undefined;
}

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

  test('works with iterables', () => {
    expect(cull(nullableNumbers())).toEqual([1, 2]);
  });
});

describe('cull (object overload)', () => {
  test('removes null and undefined values', () => {
    expect(cull({ a: 1, b: null, c: undefined, d: 2 })).toEqual({ a: 1, d: 2 });
  });

  test('removes empty arrays', () => {
    expect(cull({ a: 1, b: [] })).toEqual({ a: 1 });
  });

  test('removes empty objects', () => {
    expect(cull({ a: 1, b: {} })).toEqual({ a: 1 });
  });

  test('keeps non-empty arrays and objects', () => {
    expect(cull({ a: [1], b: { x: 1 }, c: 0 })).toEqual({ a: [1], b: { x: 1 }, c: 0 });
  });

  test('keeps falsey-but-valid values', () => {
    expect(cull({ a: 0, b: false, c: '' })).toEqual({ a: 0, b: false, c: '' });
  });

  test('returns empty object when all values are culled', () => {
    expect(cull({ a: null, b: [], c: {} })).toEqual({});
  });

  test('does not deep-cull nested structures', () => {
    expect(cull({ a: { b: {} }, c: [[], {}] })).toEqual({ a: { b: {} }, c: [[], {}] });
  });
});
