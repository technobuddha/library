/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { toString } from './to-string.ts';

describe('toString', () => {
  test('returns empty string for null and undefined', () => {
    expect(toString(null)).toBe('');
    expect(toString(undefined)).toBe('');
  });

  test('returns the string itself for string values', () => {
    expect(toString('hello')).toBe('hello');
    expect(toString('')).toBe('');
  });

  test('converts boolean values to "true" or "false"', () => {
    expect(toString(true)).toBe('true');
    expect(toString(false)).toBe('false');
  });

  test('converts symbols using Symbol.prototype.toString', () => {
    const sym = Symbol('foo');
    expect(toString(sym)).toBe(sym.toString());
  });

  test('converts bigints using BigInt.prototype.toString', () => {
    expect(toString(123n)).toBe('123');
    expect(toString(BigInt(-456))).toBe('-456');
  });

  test('returns function signature for functions', () => {
    function myFunc() {}
    const anonFunc = function () {};
    const arrowFunc = () => {};
    expect(toString(myFunc)).toBe('function myFunc();');
    expect(toString(anonFunc)).toBe('function anonFunc();');
    expect(toString(arrowFunc)).toBe('function arrowFunc();');
  });

  test('converts numbers using Number.prototype.toString', () => {
    expect(toString(42)).toBe('42');
    expect(toString(0)).toBe('0');
    expect(toString(-7.5)).toBe('-7.5');
    expect(toString(NaN)).toBe('NaN');
    expect(toString(Infinity)).toBe('Infinity');
    expect(toString(-Infinity)).toBe('-Infinity');
  });

  test('returns Object.prototype.toString for objects', () => {
    expect(toString({})).toBe('[object Object]');
    expect(toString([])).toBe('');
    expect(toString(new Date(0))).toBe(new Date(0).toString());
    expect(toString(/abc/u)).toBe('/abc/u');
    expect(toString(Object.create(null))).toBe('[object Object]');
  });
});
