import { prune } from '../prune.ts';

describe('prune', () => {
  test('removes null and undefined values', () => {
    expect(prune({ a: 1, b: null, c: undefined, d: 2 })).toEqual({ a: 1, d: 2 });
  });

  test('removes empty arrays', () => {
    expect(prune({ a: 1, b: [] })).toEqual({ a: 1 });
  });

  test('removes empty objects', () => {
    expect(prune({ a: 1, b: {} })).toEqual({ a: 1 });
  });

  test('keeps non-empty arrays and objects', () => {
    expect(prune({ a: [1], b: { x: 1 }, c: 0 })).toEqual({ a: [1], b: { x: 1 }, c: 0 });
  });

  test('keeps falsey-but-valid values', () => {
    expect(prune({ a: 0, b: false, c: '' })).toEqual({ a: 0, b: false, c: '' });
  });

  test('returns empty object when all values are culled', () => {
    expect(prune({ a: null, b: [], c: {} })).toEqual({});
  });

  test('does not deep-cull nested structures', () => {
    expect(prune({ a: { b: {} }, c: [[], {}] })).toEqual({ a: { b: {} }, c: [[], {}] });
  });
});
