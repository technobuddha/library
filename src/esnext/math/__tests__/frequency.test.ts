import { frequency } from '../frequency.ts';

describe('frequency', () => {
  test('counts frequencies of strings', () => {
    const result = frequency(['a', 'b', 'a', 'c', 'b', 'a']);
    expect(result.get('a')).toBe(3);
    expect(result.get('b')).toBe(2);
    expect(result.get('c')).toBe(1);
    expect(result.size).toBe(3);
  });

  test('counts frequencies of numbers', () => {
    const result = frequency([1, 2, 2, 3]);
    expect(result.get(1)).toBe(1);
    expect(result.get(2)).toBe(2);
    expect(result.get(3)).toBe(1);
    expect(result.size).toBe(3);
  });

  test('empty array returns empty map', () => {
    const result = frequency([]);
    expect(result.size).toBe(0);
  });

  test('all unique items', () => {
    const result = frequency(['x', 'y', 'z']);
    expect(result.get('x')).toBe(1);
    expect(result.get('y')).toBe(1);
    expect(result.get('z')).toBe(1);
    expect(result.size).toBe(3);
  });

  test('all same items', () => {
    const result = frequency([5, 5, 5, 5]);
    expect(result.get(5)).toBe(4);
    expect(result.size).toBe(1);
  });

  test('mixed types', () => {
    const result = frequency([1, '1', 1, '1', true, false, true]);
    expect(result.get(1)).toBe(2);
    expect(result.get('1')).toBe(2);
    expect(result.get(true)).toBe(2);
    expect(result.get(false)).toBe(1);
    expect(result.size).toBe(4);
  });

  test('objects as keys', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const result = frequency([obj1, obj2, obj1]);
    expect(result.get(obj1)).toBe(2);
    expect(result.get(obj2)).toBe(1);
    expect(result.size).toBe(2);
  });

  test('null and undefined', () => {
    const result = frequency([null, undefined, null, undefined, null]);
    expect(result.get(null)).toBe(3);
    expect(result.get(undefined)).toBe(2);
    expect(result.size).toBe(2);
  });
});
