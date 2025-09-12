import { isObject } from './is-object.ts';

describe('isObject', () => {
  test('returns false for null', () => {
    expect(isObject(null)).toBeFalse();
  });

  test('returns false for undefined', () => {
    expect(isObject(undefined)).toBeFalse();
  });

  test('returns false for primitive types', () => {
    expect(isObject(42)).toBeFalse();
    expect(isObject('string')).toBeFalse();
    expect(isObject(true)).toBeFalse();
    expect(isObject(Symbol('sym'))).toBeFalse();
    expect(isObject(10n)).toBeFalse();
  });

  test('returns true for plain objects', () => {
    expect(isObject({})).toBeTrue();
    expect(isObject({ a: 1 })).toBeTrue();
    expect(isObject(Object.create(null))).toBeTrue();
  });

  test('returns true for arrays', () => {
    expect(isObject([])).toBeTrue();
    expect(isObject([1, 2, 3])).toBeTrue();
  });

  test('returns false for functions', () => {
    expect(isObject(() => {})).toBeFalse();
    expect(isObject(() => {})).toBeFalse();
  });

  test('returns true for objects created with constructors', () => {
    class MyClass {}
    expect(isObject(new MyClass())).toBeTrue();
    expect(isObject(new Date())).toBeTrue();
    expect(isObject(new Map())).toBeTrue();
    expect(isObject(new Set())).toBeTrue();
  });
});
