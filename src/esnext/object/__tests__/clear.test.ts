import { clear } from '../clear.ts';

describe('clear', () => {
  test('should clear objects', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(clear(obj)).toEqual({});
    expect(obj).toEqual({});
  });

  test('should not clear the prototype', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const proto = { d: 4, e: 5, f: 6 };
    Object.setPrototypeOf(obj, proto);
    expect(clear(obj)).toEqual({});
    expect(Object.getPrototypeOf(obj)).toEqual({ d: 4, e: 5, f: 6 });
    expect(obj).toEqual({});
    expect(proto).toEqual({ d: 4, e: 5, f: 6 });
  });

  test('should clear arrays', () => {
    const arr = [1, 2, 3, 4];
    expect(clear(arr)).toEqual([]);
    expect(arr).toEqual([]);
  });

  test('should clear empty objects and arrays', () => {
    const obj = {};
    const arr: number[] = [];
    expect(clear(obj)).toEqual({});
    expect(clear(arr)).toEqual([]);
  });

  test('should clear symbol keys', () => {
    const sym1 = Symbol('foo');
    const sym2 = Symbol('bar');
    const obj: Record<string | symbol, number> = { a: 1, [sym1]: 2, [sym2]: 3 };
    clear(obj);
    expect(Object.getOwnPropertyNames(obj)).toEqual([]);
    expect(Object.getOwnPropertySymbols(obj)).toEqual([]);
    expect(obj).toEqual({});
  });

  test('should clear non-enumerable properties', () => {
    const obj: Record<string, number> = { a: 1 };
    Object.defineProperty(obj, 'hidden', {
      value: 42,
      enumerable: false,
      configurable: true,
    });
    clear(obj);
    expect(obj.hidden).toBeUndefined();
    expect(Object.keys(obj)).toEqual([]);
    expect(Object.getOwnPropertyNames(obj)).toEqual([]);
  });

  test('should mutate input in place', () => {
    const arr = [1, 2, 3];
    const obj = { x: 1, y: 2 };
    const arrRef = arr;
    const objRef = obj;
    clear(arr);
    clear(obj);
    expect(arr).toBe(arrRef);
    expect(obj).toBe(objRef);
  });
});
