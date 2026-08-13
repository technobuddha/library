import { deepEquals } from '../deep-equals.ts';

describe('deepEquals', () => {
  test('returns true for same object reference', () => {
    const obj = { a: 1, b: 2 };
    expect(deepEquals(obj, obj)).toBeTrue();
  });

  test('returns true for deeply equal objects', () => {
    const objA = { a: 1, b: { c: 2 } };
    const objB = { a: 1, b: { c: 2 } };
    expect(deepEquals(objA, objB)).toBeTrue();
  });

  test('returns false for objects with different values', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 3 };
    expect(deepEquals(objA, objB)).toBeFalse();
  });

  test('returns false for objects with different keys', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, c: 2 };
    expect(deepEquals(objA, objB)).toBeFalse();
  });

  test('returns true for objects with excluded keys', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB = { a: 1, b: 2, c: 4 };
    expect(deepEquals(objA, objB, ['c'])).toBeTrue();
  });

  test('returns false for null and object', () => {
    // eslint-disable-next-line jest-extended/prefer-to-be-false
    expect(deepEquals(null, { a: 1 })).toBe(false);
    expect(deepEquals({ a: 1 }, null)).toBeFalse();
  });

  test('returns false for undefined and object', () => {
    expect(deepEquals(undefined, { a: 1 })).toBeFalse();
    expect(deepEquals({ a: 1 }, undefined)).toBeFalse();
  });

  test('returns true for both null', () => {
    expect(deepEquals(null, null)).toBeTrue();
  });

  test('returns true for both undefined', () => {
    expect(deepEquals(undefined, undefined)).toBeTrue();
  });

  test('returns true for nested objects with same structure', () => {
    const objA = { a: { b: { c: 1 } } };
    const objB = { a: { b: { c: 1 } } };
    expect(deepEquals(objA, objB)).toBeTrue();
  });

  test('returns false for nested objects with different values', () => {
    const objA = { a: { b: { c: 1 } } };
    const objB = { a: { b: { c: 2 } } };
    expect(deepEquals(objA, objB)).toBeFalse();
  });

  test('returns true for empty objects', () => {
    expect(deepEquals({}, {})).toBeTrue();
  });

  test('returns false for empty and non-empty object', () => {
    expect(deepEquals({}, { a: 1 })).toBeFalse();
    expect(deepEquals({ a: 1 }, {})).toBeFalse();
  });

  test('returns true for arrays with same elements (as objects)', () => {
    const objA = { arr: [1, 2, 3] };
    const objB = { arr: [1, 2, 3] };
    expect(deepEquals(objA, objB)).toBeTrue();
  });

  test('returns false for arrays with different elements', () => {
    const objA = { arr: [1, 2, 3] };
    const objB = { arr: [1, 2, 4] };
    expect(deepEquals(objA, objB)).toBeFalse();
  });

  test('returns true for objects with excluded nested keys', () => {
    const objA = { a: { b: 1, c: 2 } };
    const objB = { a: { b: 1, c: 3 } };
    expect(deepEquals(objA, objB, ['c'])).toBeTrue();
  });

  test('compares primitive strings', () => {
    expect(deepEquals('hello', 'hello')).toBeTrue();
    expect(deepEquals('hello', 'world')).toBeFalse();
  });

  test('compares primitive numbers', () => {
    expect(deepEquals(42, 42)).toBeTrue();
    expect(deepEquals(42, 43)).toBeFalse();
    expect(deepEquals(NaN, NaN)).toBeTrue();
    expect(deepEquals(0, -0)).toBeFalse();
  });

  test('compares primitive booleans', () => {
    expect(deepEquals(true, true)).toBeTrue();
    expect(deepEquals(false, false)).toBeTrue();
    expect(deepEquals(true, false)).toBeFalse();
  });

  test('compares arrays as top-level arguments', () => {
    expect(deepEquals([1, 2, 3], [1, 2, 3])).toBeTrue();
    expect(deepEquals([1, 2, 3], [1, 2, 4])).toBeFalse();
    expect(deepEquals([], [])).toBeTrue();
  });

  test('compares objects with symbol keys', () => {
    const sym = Symbol('test');
    const objA = { [sym]: 1, a: 2 };
    const objB = { [sym]: 1, a: 2 };
    expect(deepEquals(objA, objB)).toBeTrue();
  });

  test('compares objects with different symbol values', () => {
    const sym = Symbol('test');
    const objA = { [sym]: 1, a: 2 };
    const objB = { [sym]: 2, a: 2 };
    expect(deepEquals(objA, objB)).toBeFalse();
  });

  test('excludes symbol keys when specified', () => {
    const sym = Symbol('test');
    const objA = { [sym]: 1, a: 2 };
    const objB = { [sym]: 2, a: 2 };
    expect(deepEquals(objA, objB, [sym])).toBeTrue();
  });

  test('compares nested arrays', () => {
    const objA = { arr: [1, [2, 3]] };
    const objB = { arr: [1, [2, 3]] };
    expect(deepEquals(objA, objB)).toBeTrue();
  });

  test('returns false for nested arrays with different values', () => {
    const objA = { arr: [1, [2, 3]] };
    const objB = { arr: [1, [2, 4]] };
    expect(deepEquals(objA, objB)).toBeFalse();
  });

  test('compares Date objects by properties', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-01');
    // Date objects are compared by own properties, not by time value
    // Both dates have no own enumerable properties, so they're equal
    expect(deepEquals({ d: date1 }, { d: date2 })).toBeTrue();
  });

  test('compares RegExp objects by properties', () => {
    const regex1 = /test/giv;
    const regex2 = /test/giv;
    // RegExp objects are compared by own properties
    // Both have the same properties (source, flags, lastIndex, etc.)
    expect(deepEquals({ r: regex1 }, { r: regex2 })).toBeTrue();
  });

  test('compares objects with numeric keys', () => {
    const objA = { 1: 'a', 2: 'b' };
    const objB = { 1: 'a', 2: 'b' };
    expect(deepEquals(objA, objB)).toBeTrue();
  });

  test('compares maps with deep-equal entries', () => {
    const mapA = new Map([
      ['a', { value: 1 }],
      ['b', [2, 3]],
    ]);
    const mapB = new Map([
      ['a', { value: 1 }],
      ['b', [2, 3]],
    ]);
    expect(deepEquals(mapA, mapB)).toBeTrue();
  });

  test('compares sets with deep-equal values', () => {
    const setA = new Set([{ value: 1 }, { nested: { value: 2 } }]);
    const setB = new Set([{ value: 1 }, { nested: { value: 2 } }]);
    expect(deepEquals(setA, setB)).toBeTrue();
  });

  test('returns false for different types', () => {
    expect(deepEquals(42, '42')).toBeFalse();
    expect(deepEquals(true, 1)).toBeFalse();
    expect(deepEquals([], {})).toBeFalse();
  });

  test('handles objects with many excluded keys', () => {
    const objA = { a: 1, b: 2, c: 3, d: 4 };
    const objB = { a: 1, b: 5, c: 6, d: 7 };
    expect(deepEquals(objA, objB, ['b', 'c', 'd'])).toBeTrue();
  });
});
