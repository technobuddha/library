import { get } from '../get.ts';

describe('get', () => {
  test('retrieves a top-level property', () => {
    const obj = { a: 1, b: 2 };
    expect(get(obj, 'a')).toBe(1);
    expect(get(obj, 'b')).toBe(2);
  });

  test('retrieves a nested property using dot notation', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, 'a.b.c')).toBe(42);
  });

  test('retrieves a nested property using array path', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, ['a', 'b', 'c'])).toBe(42);
  });

  test('returns undefined for missing property', () => {
    const obj = { a: { b: 1 } };
    expect(get(obj, 'a.c')).toBeUndefined();
    expect(get(obj, ['a', 'c'])).toBeUndefined();
  });

  test('handles array indices in path', () => {
    const obj = { a: [{ b: 7 }, { b: 8 }] };
    expect(get(obj, 'a[0].b')).toBe(7);
    expect(get(obj, 'a[1].b')).toBe(8);
  });

  test('handles bracket notation for nested objects', () => {
    const obj = { a: { b: { c: 99 } } };
    expect(get(obj, 'a[b][c]')).toBe(99);
  });

  test('returns undefined for non-object traversal', () => {
    const obj = { a: null };
    expect(get(obj, 'a.b')).toBeUndefined();
  });

  test('returns object for empty path', () => {
    const obj = { a: 1 };
    expect(get(obj, '')).toBe(obj);
    expect(get(obj, [])).toBe(obj);
  });
});
