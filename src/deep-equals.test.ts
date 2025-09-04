import { describe, expect, test } from 'vitest';

import { deepEquals } from './deep-equals.ts';

describe('deepEquals', () => {
  test('returns true for same object reference', () => {
    const obj = { a: 1, b: 2 };
    expect(deepEquals(obj, obj)).toBe(true);
  });

  test('returns true for deeply equal objects', () => {
    const objA = { a: 1, b: { c: 2 } };
    const objB = { a: 1, b: { c: 2 } };
    expect(deepEquals(objA, objB)).toBe(true);
  });

  test('returns false for objects with different values', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 3 };
    expect(deepEquals(objA, objB)).toBe(false);
  });

  test('returns false for objects with different keys', () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, c: 2 };
    expect(deepEquals(objA, objB)).toBe(false);
  });

  test('returns true for objects with excluded keys', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB = { a: 1, b: 2, c: 4 };
    expect(deepEquals(objA, objB, ['c'])).toBe(true);
  });

  test('returns false for null and object', () => {
    expect(deepEquals(null, { a: 1 })).toBe(false);
    expect(deepEquals({ a: 1 }, null)).toBe(false);
  });

  test('returns false for undefined and object', () => {
    expect(deepEquals(undefined, { a: 1 })).toBe(false);
    expect(deepEquals({ a: 1 }, undefined)).toBe(false);
  });

  test('returns true for both null', () => {
    expect(deepEquals(null, null)).toBe(true);
  });

  test('returns true for both undefined', () => {
    expect(deepEquals(undefined, undefined)).toBe(true);
  });

  test('returns true for nested objects with same structure', () => {
    const objA = { a: { b: { c: 1 } } };
    const objB = { a: { b: { c: 1 } } };
    expect(deepEquals(objA, objB)).toBe(true);
  });

  test('returns false for nested objects with different values', () => {
    const objA = { a: { b: { c: 1 } } };
    const objB = { a: { b: { c: 2 } } };
    expect(deepEquals(objA, objB)).toBe(false);
  });

  test('returns true for empty objects', () => {
    expect(deepEquals({}, {})).toBe(true);
  });

  test('returns false for empty and non-empty object', () => {
    expect(deepEquals({}, { a: 1 })).toBe(false);
    expect(deepEquals({ a: 1 }, {})).toBe(false);
  });

  test('returns true for arrays with same elements (as objects)', () => {
    const objA = { arr: [1, 2, 3] };
    const objB = { arr: [1, 2, 3] };
    expect(deepEquals(objA, objB)).toBe(true);
  });

  test('returns false for arrays with different elements', () => {
    const objA = { arr: [1, 2, 3] };
    const objB = { arr: [1, 2, 4] };
    expect(deepEquals(objA, objB)).toBe(false);
  });

  test('returns true for objects with excluded nested keys', () => {
    const objA = { a: { b: 1, c: 2 } };
    const objB = { a: { b: 1, c: 3 } };
    expect(deepEquals(objA, objB, ['c'])).toBe(true);
  });
});
