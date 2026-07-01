import { shallowEquals } from '../shallow-equals.ts';

describe('shallowEquals', () => {
  test('compares flat objects for equality', () => {
    expect(shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBeTrue();
  });

  test('null equals null and undefined equals undefined', () => {
    expect(shallowEquals(null, null)).toBeTrue();
    expect(shallowEquals(undefined, undefined)).toBeTrue();
    expect(shallowEquals(undefined, null)).toBeFalse();
    expect(shallowEquals(null, undefined)).toBeFalse();
  });

  test('same object reference', () => {
    const obj = { x: 1, y: 2 };
    expect(shallowEquals(obj, obj)).toBeTrue();
  });

  test('object vs null/undefined', () => {
    const obj = { x: 1 };
    expect(shallowEquals(obj, null)).toBeFalse();
    expect(shallowEquals(obj, undefined)).toBeFalse();
  });

  test('different number of keys', () => {
    expect(shallowEquals({ a: 1 }, { a: 1, b: 2 })).toBeFalse();
  });

  test('compares by reference, not by value', () => {
    const a = { z: 1 };
    const b = { z: 1 };
    expect(shallowEquals({ q: a }, { q: b })).toBeFalse();
  });

  test('NaN equals NaN (SameValue)', () => {
    expect(shallowEquals({ q: NaN }, { q: NaN })).toBeTrue();
  });

  test('-0 does not equal 0 (SameValue)', () => {
    expect(shallowEquals({ q: 0 }, { q: -0 })).toBeFalse();
  });

  test('compares primitive strings', () => {
    expect(shallowEquals('hello', 'hello')).toBeTrue();
    expect(shallowEquals('hello', 'world')).toBeFalse();
  });

  test('compares primitive numbers', () => {
    expect(shallowEquals(42, 42)).toBeTrue();
    expect(shallowEquals(42, 43)).toBeFalse();
  });

  test('compares primitive booleans', () => {
    expect(shallowEquals(true, true)).toBeTrue();
    expect(shallowEquals(false, false)).toBeTrue();
    expect(shallowEquals(true, false)).toBeFalse();
  });

  test('compares arrays as top-level arguments', () => {
    expect(shallowEquals([1, 2, 3], [1, 2, 3])).toBeTrue();
    expect(shallowEquals([1, 2, 3], [1, 2, 4])).toBeFalse();
    expect(shallowEquals([], [])).toBeTrue();
  });

  test('does not deeply compare nested objects', () => {
    const nested1 = { obj: { value: 1 } };
    const nested2 = { obj: { value: 1 } };
    expect(shallowEquals(nested1, nested2)).toBeFalse();
  });

  test('does not deeply compare nested arrays', () => {
    const arr1 = { arr: [1, 2, 3] };
    const arr2 = { arr: [1, 2, 3] };
    expect(shallowEquals(arr1, arr2)).toBeFalse();
  });

  test('compares objects with symbol keys', () => {
    const sym = Symbol('test');
    const objA = { [sym]: 1, a: 2 };
    const objB = { [sym]: 1, a: 2 };
    expect(shallowEquals(objA, objB)).toBeTrue();
  });

  test('objects with different symbol values are not equal', () => {
    const sym = Symbol('test');
    const objA = { [sym]: 1, a: 2 };
    const objB = { [sym]: 2, a: 2 };
    expect(shallowEquals(objA, objB)).toBeFalse();
  });

  test('excludes keys from comparison', () => {
    expect(shallowEquals({ a: 1, b: 2 }, { a: 1, b: 3 }, ['b'])).toBeTrue();
  });

  test('excludes symbol keys from comparison', () => {
    const sym = Symbol('test');
    const objA = { [sym]: 1, a: 2 };
    const objB = { [sym]: 2, a: 2 };
    expect(shallowEquals(objA, objB, [sym])).toBeTrue();
  });

  test('compares empty objects', () => {
    expect(shallowEquals({}, {})).toBeTrue();
  });

  test('empty vs non-empty object', () => {
    expect(shallowEquals({}, { a: 1 })).toBeFalse();
    expect(shallowEquals({ a: 1 }, {})).toBeFalse();
  });

  test('compares same reference values', () => {
    const ref = { x: 1 };
    expect(shallowEquals({ q: ref }, { q: ref })).toBeTrue();
  });

  test('returns false for different types', () => {
    expect(shallowEquals(42, '42')).toBeFalse();
    expect(shallowEquals(true, 1)).toBeFalse();
    expect(shallowEquals([], {})).toBeFalse();
  });

  test('shallowEquals primitive vs object', () => {
    expect(shallowEquals(42, [42])).toBeFalse();
  });
});
