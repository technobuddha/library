/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unicorn/consistent-function-scoping */

import { isFunction } from '../is-function.ts';

describe('isFunction', () => {
  test('returns true for regular functions', () => {
    function fn(): void {}
    expect(isFunction(fn)).toBeTrue();
    expect(isFunction(function () {})).toBeTrue();
  });

  test('returns true for arrow functions', () => {
    const arrow = (): void => {};
    expect(isFunction(arrow)).toBeTrue();
  });

  test('returns true for async functions', () => {
    async function asyncFn(): Promise<void> {}
    expect(isFunction(asyncFn)).toBeTrue();
  });

  test('returns true for generator functions', () => {
    function* genFn(): Generator<void> {}
    expect(isFunction(genFn)).toBeTrue();
  });

  test('returns true for proxies of functions', () => {
    const fn = (): void => {};
    const proxy = new Proxy(fn, {});
    expect(isFunction(proxy)).toBeTrue();
  });

  test('returns false for non-function objects', () => {
    expect(isFunction({})).toBeFalse();
    expect(isFunction([])).toBeFalse();
    expect(isFunction(null)).toBeFalse();
    expect(isFunction(undefined)).toBeFalse();
    expect(isFunction(123)).toBeFalse();
    expect(isFunction('function')).toBeFalse();
    expect(isFunction(/abc/v)).toBeFalse();
    expect(isFunction(new Date())).toBeFalse();
  });

  test('returns false for class instances', () => {
    class MyClass {}
    expect(isFunction(new MyClass())).toBeFalse();
  });

  test('returns true for class constructors', () => {
    class MyClass {}
    expect(isFunction(MyClass)).toBeTrue();
  });
});
