import { unset } from '../unset.ts';

describe('unset', () => {
  test('removes a top-level property', () => {
    const obj: Record<string, unknown> = { a: 1, b: 2 };
    unset(obj, 'a');
    expect(obj).toStrictEqual({ b: 2 });
  });

  test('removes a nested property using dot notation', () => {
    const obj: Record<string, unknown> = { a: { b: { c: 42 } } };
    unset(obj, 'a.b.c');
    expect(obj).toStrictEqual({ a: { b: {} } });
  });

  test('removes a nested property using array path', () => {
    const obj: Record<string, unknown> = { x: { y: { z: 'foo' } } };
    unset(obj, ['x', 'y', 'z']);
    expect(obj).toStrictEqual({ x: { y: {} } });
  });

  test('removes array element using bracket notation', () => {
    const obj: Record<string, unknown> = { arr: [1, 2, 3] };
    unset(obj, 'arr[1]');
    expect(obj.arr).toEqual([1, undefined, 3]);
  });

  test('returns object unchanged if path does not exist', () => {
    const obj: Record<string, unknown> = { a: 1 };
    unset(obj, 'b.c');
    expect(obj).toStrictEqual({ a: 1 });
  });

  test('leaves object unchanged if intermediate is not object', () => {
    const obj: Record<string, unknown> = { a: 1, b: { c: 2 } };
    unset(obj, 'a.b.c');
    expect(obj).toStrictEqual({ a: 1, b: { c: 2 } });
  });

  test('returns object unchanged for empty path', () => {
    const obj: Record<string, unknown> = { a: 1 };
    unset(obj, []);
    expect(obj).toStrictEqual({ a: 1 });
  });
});
