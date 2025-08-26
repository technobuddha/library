/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collapse } from './collapse.ts';

describe('collapse', () => {
  test('collapses simple string arguments', () => {
    expect(collapse('a', 'b', 'c')).toEqual(['a', 'b', 'c']);
  });

  test('filters out null and undefined values', () => {
    expect(collapse('a', null, undefined, 'b')).toEqual(['a', 'b']);
  });

  test('handles functions returning string-like values', () => {
    expect(
      collapse(
        () => 'x',
        () => null,
        () => undefined,
        'y',
      ),
    ).toEqual(['x', 'y']);
  });

  test('handles iterables of string-like values', () => {
    expect(collapse(['a', null, undefined, 'b'], 'c')).toEqual(['a', 'b', 'c']);
  });

  test('handles generators of string-like values', () => {
    function* gen() {
      yield 'foo';
      yield null;
      yield undefined;
      yield 'bar';
    }
    expect(collapse(gen(), 'baz')).toEqual(['foo', 'bar', 'baz']);
  });

  test('handles mixed argument types', () => {
    function* gen() {
      yield 'g1';
      yield null;
      yield 'g2';
    }
    const fn = () => 'fn1';
    expect(collapse('a', fn, ['b', null], gen(), undefined, null)).toEqual([
      'a',
      'fn1',
      'b',
      'g1',
      'g2',
    ]);
  });

  test('returns an empty array if all values are null or empty', () => {
    expect(collapse(null, undefined, () => undefined, [], (() => null)())).toEqual([]);
  });
});
