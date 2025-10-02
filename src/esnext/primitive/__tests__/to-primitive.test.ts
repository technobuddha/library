/* eslint-disable unicorn/new-for-builtins */
import { empty, space } from '../../unicode/unicode.ts';

import { toPrimitive } from '../to-primitive.ts';

describe('toPrimitive', () => {
  test('should convert strings', () => {
    expect(toPrimitive(empty)).toBe(empty);
    expect(toPrimitive(space)).toBe(space);
    expect(toPrimitive('jabberwocky')).toBe('jabberwocky');
    expect(toPrimitive('0')).toBe('0');
  });

  test('should handle numbers', () => {
    expect(toPrimitive(0)).toBe(0);
    expect(toPrimitive(-0)).toBe(-0);
    expect(toPrimitive(1)).toBe(1);
    expect(toPrimitive(Infinity)).toBe(Infinity);
    expect(toPrimitive(-Infinity)).toBe(-Infinity);
    expect(Number.isNaN(toPrimitive(Number.NaN))).toBeTrue();
  });

  test('should handle booleans', () => {
    expect(toPrimitive(true)).toBeTrue();
    expect(toPrimitive(false)).toBeFalse();
  });

  test('should handle null and undefined', () => {
    expect(toPrimitive(null)).toBeNull();
    expect(toPrimitive(undefined)).toBeUndefined();
  });

  test('should handle symbols', () => {
    expect(toPrimitive(Symbol.toPrimitive)).toBe(Symbol.toPrimitive);
  });

  test('should handle bigint', () => {
    expect(toPrimitive(100n)).toBe(100n);
  });

  test('should handle function', () => {
    expect(() => toPrimitive(() => 42)).toThrow();
  });

  test('should not be abe to convert null prototype', () => {
    const obj = Object.create(null);
    expect(() => toPrimitive(obj)).toThrow('Cannot convert object to a primitive value');
    expect(() => toPrimitive(obj, 'string')).toThrow('Cannot convert object to a primitive value');
    expect(() => toPrimitive(obj, 'number')).toThrow('Cannot convert object to a primitive value');
  });

  test('should use toValue method', () => {
    const obj = Object.create(null);
    obj.valueOf = () => 'valueOf';
    expect(toPrimitive(obj)).toBe('valueOf');
    expect(toPrimitive(obj, 'string')).toBe('valueOf');
    expect(toPrimitive(obj, 'number')).toBe('valueOf');
  });

  test('should use toString method', () => {
    const obj = Object.create(null);
    obj.toString = () => 'toString';
    expect(toPrimitive(obj)).toBe('toString');
    expect(toPrimitive(obj, 'string')).toBe('toString');
    expect(toPrimitive(obj, 'number')).toBe('toString');
  });

  test('should use preferred method', () => {
    const obj = Object.create(null);
    obj.valueOf = () => 'valueOf';
    obj.toString = () => 'toString';

    expect(toPrimitive(obj)).toBe('valueOf');
    expect(toPrimitive(obj, 'string')).toBe('toString');
    expect(toPrimitive(obj, 'number')).toBe('valueOf');
  });

  test('should use always prefer toPrimitive symbol', () => {
    const obj = Object.create(null);
    obj.valueOf = () => 'valueOf';
    obj.toString = () => 'toString';
    obj[Symbol.toPrimitive] = (hint: string) => hint;

    expect(toPrimitive(obj)).toBe('default');
    expect(toPrimitive(obj, 'string')).toBe('string');
    expect(toPrimitive(obj, 'number')).toBe('number');
  });

  test('should handle objects and arrays', () => {
    expect(toPrimitive([])).toEqual([]);
    expect(toPrimitive([1, 2, 3])).toEqual([1, 2, 3]);
    expect(toPrimitive({})).toEqual({});
  });

  test('should handle boxed primitives', () => {
    expect(toPrimitive(new String('abc'))).toBe('abc');
    expect(toPrimitive(new Number(42))).toBe(42);
    expect(toPrimitive(Object(42n))).toBe(42n);
    expect(toPrimitive(new Boolean(true))).toBe(true);
    const sym = Symbol('x');
    expect(toPrimitive(Object(sym))).toBe(sym);
  });

  test('should handle regular objects with Symbol.toPrimitive', () => {
    // Regular objects (not Object.create(null)) that have Symbol.toPrimitive
    const obj = {
      [Symbol.toPrimitive](hint: string) {
        return `primitive-${hint}`;
      },
    };

    expect(toPrimitive(obj)).toBe('primitive-default');
    expect(toPrimitive(obj, 'string')).toBe('primitive-string');
    expect(toPrimitive(obj, 'number')).toBe('primitive-number');
  });

  test('should handle hint of string', () => {
    expect(toPrimitive(undefined, 'string')).toBeUndefined();
    expect(toPrimitive(null, 'string')).toBeNull();
    expect(toPrimitive('123', 'string')).toBe('123');
    expect(toPrimitive(123, 'string')).toBe('123');
    expect(toPrimitive(false, 'string')).toBe('false');
    expect(toPrimitive(Symbol.toPrimitive, 'string')).toBe(Symbol.toPrimitive);
    expect(toPrimitive([1, 2, 3], 'string')).toBe('1,2,3');
  });

  test('should handle hint of number', () => {
    expect(toPrimitive(undefined, 'number')).toBeUndefined();
    expect(toPrimitive(null, 'number')).toBeNull();
    expect(toPrimitive('123', 'number')).toBe('123');
    expect(toPrimitive(123, 'number')).toBe(123);
    expect(toPrimitive(false, 'number')).toBeFalse();
    expect(toPrimitive(Symbol.toPrimitive, 'number')).toBe(Symbol.toPrimitive);
    expect(toPrimitive([1, 2, 3], 'number')).toEqual([1, 2, 3]);
  });

  test('should handle hint of default', () => {
    expect(toPrimitive(undefined, 'default')).toBeUndefined();
    expect(toPrimitive(null, 'default')).toBeNull();
    expect(toPrimitive('123', 'default')).toBe('123');
    expect(toPrimitive(123, 'default')).toBe(123);
    expect(toPrimitive(false, 'default')).toBeFalse();
    expect(toPrimitive(Symbol.toPrimitive, 'default')).toBe(Symbol.toPrimitive);
    expect(toPrimitive([1, 2, 3], 'default')).toEqual([1, 2, 3]);
  });
});
