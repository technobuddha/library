import { clear } from './clear.ts';

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
});
