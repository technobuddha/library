import { omitProperties } from '../omit-properties.ts';

describe('omitProperties', () => {
  test('omits single property', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const result = omitProperties(obj, 'x');
    expect(result).toEqual({ y: 2, z: 3 });
  });

  test('omits multiple properties', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const result = omitProperties(obj, 'x', 'y');
    expect(result).toEqual({ z: 3 });
  });

  test('omits all properties', () => {
    const obj = { x: 1, y: 2 };
    const result = omitProperties(obj, 'x', 'y');
    expect(result).toEqual({});
  });

  test('omits non-existent property', () => {
    const obj = { x: 1, y: 2 };
    const result = omitProperties(obj, 'z' as unknown as 'x' | 'y');
    expect(result).toEqual({ x: 1, y: 2 });
  });

  test('returns new object, does not mutate original', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const result = omitProperties(obj, 'x');
    expect(result).not.toBe(obj);
    expect(obj).toEqual({ x: 1, y: 2, z: 3 });
  });

  test('preserves property values', () => {
    const obj = { a: 'hello', b: 42, c: true, d: null };
    const result = omitProperties(obj, 'b');
    expect(result).toEqual({ a: 'hello', c: true, d: null });
  });

  test('works with empty object', () => {
    const obj = {};
    const result = omitProperties(obj);
    expect(result).toEqual({});
  });
});
