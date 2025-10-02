import { deepCopy } from '../deep-copy.ts';

describe('deepCopy', () => {
  test('copies primitives as-is', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy(undefined)).toBeUndefined();
    expect(deepCopy(true)).toBeTrue();
  });

  test('copies arrays deeply', () => {
    const arr = [1, { a: 2 }, [3, 4]];
    const copy = deepCopy(arr);
    expect(copy).toEqual(arr);
    expect(copy).not.toBe(arr);
    expect(copy[1]).not.toBe(arr[1]);
    expect(copy[2]).not.toBe(arr[2]);
  });

  test('copies objects deeply', () => {
    const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
    const copy = deepCopy(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
    expect(copy.d).not.toBe(obj.d);
  });

  test('copies nested structures', () => {
    const nested = { a: [{ b: { c: 1 } }] };
    const copy = deepCopy(nested);
    expect(copy).toEqual(nested);
    expect(copy.a[0].b).not.toBe(nested.a[0].b);
  });

  test('preserves prototype', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
    interface MyClass {
      x: number;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
    class MyClass {
      public x = 1;
    }
    const instance = new MyClass();

    const copy = deepCopy(instance);
    expect(copy).toEqual(instance);
    expect(Object.getPrototypeOf(copy)).toBe(MyClass.prototype);
  });

  test('handles symbol keys', () => {
    const sym = Symbol('foo');
    const obj = { [sym]: 123 };
    const copy = deepCopy(obj);
    expect(copy[sym]).toBe(123);
  });

  test('does not copy functions', () => {
    const obj = { fn: () => 42 };
    const copy = deepCopy(obj);
    expect(typeof copy.fn).toBe('function');
    expect(copy.fn()).toBe(42);
    expect(copy.fn).toBe(obj.fn); // functions are not deep copied
  });
});
