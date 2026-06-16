import { cull } from '../cull.ts';

describe('cull', () => {
  test('returns nullish values unchanged', () => {
    expect(cull(null)).toBeNull();
    expect(cull(undefined)).toBeUndefined();
  });

  test('returns primitive values unchanged', () => {
    expect(cull('abc')).toBe('abc');
    expect(cull(0)).toBe(0);
    expect(cull(false)).toBeFalse();
  });

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

  test('removes null and undefined properties from objects', () => {
    expect(cull({ a: 1, b: null, c: undefined, d: 'ok' })).toEqual({ a: 1, d: 'ok' });
  });

  test('removes nested arrays and objects that become empty', () => {
    expect(
      cull({
        a: [1, null, 2, undefined],
        b: { c: null, d: 4, e: [null, undefined, 5] },
        f: { g: null },
        h: [null, undefined],
      }),
    ).toEqual({
      a: [1, 2],
      b: { d: 4, e: [5] },
    });
  });

  test('removes empty strings from nested arrays and objects when enabled', () => {
    expect(
      cull(
        {
          a: ['', 'ok'],
          b: { c: '', d: 'ok' },
          e: [[''], { f: '' }],
        },
        { emptyStrings: true },
      ),
    ).toEqual({
      a: ['ok'],
      b: { d: 'ok' },
    });
  });

  test('preserves empty nested arrays when emptyArrays is false', () => {
    expect(cull({ a: [null], b: { c: 1 } }, { emptyArrays: false })).toEqual({
      a: [],
      b: { c: 1 },
    });
  });

  test('preserves empty nested objects when emptyObjects is false', () => {
    expect(cull([{ a: null }], { emptyObjects: false })).toEqual([{}]);
  });

  test('removes nested empty arrays and objects from arrays', () => {
    expect(cull([{ a: null }, { b: 2 }, [null, undefined], { c: null }])).toEqual([{ b: 2 }]);
  });

  test('preserves empty top-level arrays and objects', () => {
    expect(cull([null, undefined])).toEqual([]);
    expect(cull({ a: null, b: undefined })).toEqual({});
  });

  test('preserves functions unchanged', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fn = (): string => 'ok';

    expect(cull(fn)).toBe(fn);
  });

  test('preserves falsy object values that are not nullish', () => {
    expect(cull({ a: 0, b: '', c: false, d: null, e: undefined })).toEqual({
      a: 0,
      b: '',
      c: false,
    });
  });
});
