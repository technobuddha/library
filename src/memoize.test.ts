import { vi } from 'vitest';

import { memoize } from './memoize.ts';

describe('memoize', () => {
  test('caches results for the same object key', () => {
    const fn = vi.fn((obj: Record<string, unknown>) => Object.keys(obj).length);

    const memoized = memoize(fn);

    const a: Record<string, unknown> = { foo: 1, bar: 2 };
    expect(memoized(a)).toBe(2);
    expect(memoized(a)).toBe(2);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('caches results for multiple object keys', () => {
    const fn = vi.fn((obj: Record<string, unknown>) => Object.keys(obj).length);
    const memoized = memoize(fn);

    const a: Record<string, unknown> = { foo: 1 };
    const b: Record<string, unknown> = { bar: 2, baz: 3 };
    expect(memoized(a)).toBe(1);
    expect(memoized(b)).toBe(2);
    expect(memoized(a)).toBe(1);
    expect(memoized(b)).toBe(2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('supports additional arguments', () => {
    const fn = vi.fn(
      (obj: Record<string, unknown>, value: number) => Object.keys(obj).length + value,
    );
    const memoized = memoize(fn);

    const a: Record<string, unknown> = { foo: 1 };
    expect(memoized(a, 5)).toBe(6);
    expect(memoized(a, 5)).toBe(6);
    expect(fn).toHaveBeenCalledOnce();
  });

  test('uses resolver to customize cache key', () => {
    const fn = vi.fn((_obj: Record<string, unknown>, value: number) => value);
    const resolver = (_obj: Record<string, unknown>, value: number): Record<string, unknown> =>
      value as unknown as Record<string, unknown>;
    const memoized = memoize(fn, resolver);

    const a: Record<string, unknown> = { foo: 1 };
    expect(memoized(a, 1)).toBe(1);
    expect(memoized(a, 2)).toBe(2);
    expect(memoized(a, 1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('exposes cache property', () => {
    const fn = (obj: Record<string, unknown>): number => Object.keys(obj).length;
    const memoized = memoize(fn);

    const a: Record<string, unknown> = { foo: 1 };
    memoized(a);
    expect(memoized.cache.has(a)).toBeTrue();
    expect(memoized.cache.get(a)).toBe(1);
  });
});
