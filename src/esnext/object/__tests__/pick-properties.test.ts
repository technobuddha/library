import { pickProperties } from '../pick-properties.ts';

describe('pickProperties', () => {
  test('picks single property', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const result = pickProperties(obj, 'x');
    expect(result).toEqual({ x: 1 });
  });

  test('picks multiple properties', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const result = pickProperties(obj, 'x', 'y');
    expect(result).toEqual({ x: 1, y: 2 });
  });

  test('picks all properties', () => {
    const obj = { x: 1, y: 2 };
    const result = pickProperties(obj, 'x', 'y');
    expect(result).toEqual({ x: 1, y: 2 });
  });

  test('picks non-existent property', () => {
    const obj = { x: 1, y: 2 };
    const result = pickProperties(obj, 'z' as unknown as 'x' | 'y');
    expect(result).toEqual({});
  });

  test('returns new object, does not mutate original', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const result = pickProperties(obj, 'x');
    expect(result).not.toBe(obj);
    expect(obj).toEqual({ x: 1, y: 2, z: 3 });
  });

  test('preserves property values', () => {
    const obj = { a: 'hello', b: 42, c: true, d: null };
    const result = pickProperties(obj, 'a', 'c', 'd');
    expect(result).toEqual({ a: 'hello', c: true, d: null });
  });

  test('works with empty object', () => {
    const obj = {};
    const result = pickProperties(obj);
    expect(result).toEqual({});
  });

  test('picks no properties when no keys provided', () => {
    const obj = { x: 1, y: 2 };
    const result = pickProperties(obj);
    expect(result).toEqual({});
  });
});
