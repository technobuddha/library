import { deepMerge } from '../deep-merge.ts';

describe('deepMerge', () => {
  test('merges two flat objects', () => {
    const a = { x: 1, y: 2, z: 0 };
    const b = { y: 3, z: 4 };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: 1, y: 3, z: 4 });
  });

  test('merges nested objects', () => {
    const a = { x: { y: 1, z: 0 } };
    const b = { x: { y: 1, z: 2 } };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: { y: 1, z: 2 } });
  });

  test('overwrites non-object values', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 2, y: 3 };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: 2, y: 3 });
  });

  test('merges multiple objects', () => {
    const a = { x: 1, y: 0, z: 0 };
    const b = { y: 2 };
    const c = { z: 3 };
    const result = deepMerge(a, b, c);
    expect(result).toEqual({ x: 1, y: 2, z: 3 });
  });

  test('handles empty objects', () => {
    const a = { x: 0 };
    const b = { x: 1 };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: 1 });
  });

  test('does not mutate input objects', () => {
    const a = { x: 1, y: 0 };
    const b = { y: 2 };
    deepMerge(a, b);
    expect(a).toEqual({ x: 1, y: 0 });
    expect(b).toEqual({ y: 2 });
  });

  test('merges objects with arrays', () => {
    const a = { x: [1, 2], y: 1 };
    const b = { x: [3, 4], y: 2 };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: [3, 4], y: 2 });
  });

  test('merges nested arrays', () => {
    const a = { x: { arr: [1, 2] } };
    const b = { x: { arr: [2, 3] } };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: { arr: [2, 3] } });
  });

  test('merges arrays and objects', () => {
    const a = { x: [1, 2], y: { z: 3 } };
    const b = { x: [3], y: { z: 4 } };
    const result = deepMerge(a, b);
    expect(result).toEqual({ x: [3], y: { z: 4 } });
  });

  test('handles null and undefined objects in merge', () => {
    const a = { x: 1 };
    const result = deepMerge(a, undefined, { y: 2 });
    expect(result).toEqual({ x: 1, y: 2 });
  });

  test('handles undefined as main object', () => {
    const result = deepMerge(undefined, { x: 1 }, { y: 2 });
    expect(result).toEqual({ x: 1, y: 2 });
  });
});
