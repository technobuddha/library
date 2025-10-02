import { set } from '../set.ts';

describe('set', () => {
  test('sets a top-level property', () => {
    const obj = {};
    set(obj, 'a', 1);
    expect(obj).toStrictEqual({ a: 1 });
  });

  test('sets a nested property using dot notation', () => {
    const obj = {};
    set(obj, 'a.b.c', 42);
    expect(obj).toStrictEqual({ a: { b: { c: 42 } } });
  });

  test('sets a nested property using array path', () => {
    const obj = {};
    set(obj, ['x', 'y', 'z'], 'foo');
    expect(obj).toStrictEqual({ x: { y: { z: 'foo' } } });
  });

  test('creates arrays for numeric keys', () => {
    const obj = {};
    set(obj, 'arr[0].val', 'bar');
    expect(obj).toStrictEqual({ arr: [{ val: 'bar' }] });
  });

  test('overwrites non-object intermediate values', () => {
    const obj = { a: 1 };
    set(obj, 'a.b', 99);
    expect(obj).toStrictEqual({ a: { b: 99 } });
  });

  test('returns the original object', () => {
    const obj = {};
    const result = set(obj, 'foo', 'bar');
    expect(result).toBe(obj);
  });

  test('creates an array for a missing intermediate numeric key', () => {
    const obj = {};
    set(obj, 'foo[0].bar', 'baz');
    expect(obj).toStrictEqual({ foo: [{ bar: 'baz' }] });
  });

  test('creates an object for a missing intermediate non-numeric key', () => {
    const obj = {};
    set(obj, 'foo.bar.baz', 123);
    expect(obj).toStrictEqual({ foo: { bar: { baz: 123 } } });
  });

  test('overwrites non-object with array for numeric key', () => {
    const obj = { foo: 'not-an-object' };
    set(obj, 'foo[0].bar', 'baz');
    expect(obj).toStrictEqual({ foo: [{ bar: 'baz' }] });
  });

  test('overwrites non-object with object for non-numeric key', () => {
    const obj = { foo: 'not-an-object' };
    set(obj, 'foo.bar.baz', 123);
    expect(obj).toStrictEqual({ foo: { bar: { baz: 123 } } });
  });

  test('overwrites existing non-object intermediate value with array for numeric key', () => {
    const obj = { foo: 123 };
    set(obj, 'foo[0].bar', 'baz');
    expect(obj).toStrictEqual({ foo: [{ bar: 'baz' }] });
  });

  test('overwrites existing non-object intermediate value with object for non-numeric key', () => {
    const obj = { foo: 123 };
    set(obj, 'foo.bar.baz', 456);
    expect(obj).toStrictEqual({ foo: { bar: { baz: 456 } } });
  });

  test('adds properties to existing arrays', () => {
    const obj = { foo: [] };
    set(obj, 'foo.bar.baz', 'qux');
    expect((obj.foo as unknown as Record<string, unknown>).bar).toStrictEqual({
      baz: 'qux',
    });
  });

  test('adds numeric properties to existing objects', () => {
    const obj = { foo: {} };
    set(obj, 'foo[0].bar', 'qux');
    expect(obj).toStrictEqual({ foo: { 0: { bar: 'qux' } } });
  });

  test('empty path array', () => {
    const obj = { foo: {} };
    set(obj, [], 'value');
    expect(obj).toStrictEqual({ foo: {} });
  });
});
