/* eslint-disable func-style */
/* eslint-disable unicorn/consistent-function-scoping */
import { toString } from '../to-string.ts';

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
    expect(toString(-456n)).toBe('-456');
  });

  test('returns function signature for functions', () => {
    function myFunc(): void {
      // noop
    }
    const anonFunc = function (): void {
      // noop
    };
    const arrowFunc = (): void => {};
    expect(toString(myFunc)).toBe('function myFunc();');
    expect(toString(anonFunc)).toBe('function anonFunc();');
    expect(toString(arrowFunc)).toBe('function arrowFunc();');
  });

  test('handles objects with own toString property', () => {
    // Object with its own toString property (not inherited)
    const obj = { toString: () => 'own toString' };
    expect(toString(obj)).toBe('own toString');
  });

  test('handles objects with toString in prototype', () => {
    // Object without own toString but has it in prototype
    const obj = Object.create({ toString: () => 'from prototype' });
    expect(toString(obj)).toBe('from prototype');
  });

  test('handles objects with prototype but no toString', () => {
    // Object with a prototype that doesn't have toString
    const proto = Object.create(null);
    const obj = Object.create(proto);
    expect(toString(obj)).toBe('[object Object]');
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
    expect(toString(/abc/v)).toBe('/abc/v');
    expect(toString(Object.create(null))).toBe('[object Object]');
  });
});
