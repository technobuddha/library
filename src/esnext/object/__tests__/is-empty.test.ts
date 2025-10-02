import { isEmpty } from '../is-empty.ts';

describe('isEmpty', () => {
  test('returns true for empty string', () => {
    expect(isEmpty('')).toBeTrue();
  });

  test('returns false for non-empty string', () => {
    expect(isEmpty('hello')).toBeFalse();
  });

  test('returns true for empty array', () => {
    expect(isEmpty([])).toBeTrue();
  });

  test('returns false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBeFalse();
  });

  test('returns true for empty array-like object', () => {
    expect(isEmpty({ length: 0 })).toBeTrue();
  });

  test('returns false for non-empty array-like object', () => {
    expect(isEmpty({ length: 2 })).toBeFalse();
  });

  test('returns true for empty Map', () => {
    expect(isEmpty(new Map())).toBeTrue();
  });

  test('returns false for non-empty Map', () => {
    const map = new Map([['key', 'value']]);
    expect(isEmpty(map)).toBeFalse();
  });

  test('returns true for empty Set', () => {
    expect(isEmpty(new Set())).toBeTrue();
  });

  test('returns false for non-empty Set', () => {
    const set = new Set([1]);
    expect(isEmpty(set)).toBeFalse();
  });

  test('returns true for empty object', () => {
    expect(isEmpty({})).toBeTrue();
  });

  test('returns false for object with keys', () => {
    expect(isEmpty({ a: 1 })).toBeFalse();
  });

  test('returns false for object with only non-enumerable properties', () => {
    const obj = {};
    Object.defineProperty(obj, 'hidden', {
      value: 42,
      enumerable: false,
    });
    expect(isEmpty(obj)).toBeFalse();
  });

  test('return false for non-object non-collection types', () => {
    expect(isEmpty(42)).toBeFalse();
    expect(isEmpty(true)).toBeFalse();
    expect(isEmpty(null)).toBeFalse();
    expect(isEmpty(undefined)).toBeFalse();
  });
});
