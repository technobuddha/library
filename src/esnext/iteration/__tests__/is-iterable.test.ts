import { isIterable } from '../is-iterable.ts';

function* gen(): Generator<number> {
  yield 1;
}

function fn(): void {
  // noop
}

describe('isIterable', () => {
  test('returns true for arrays', () => {
    expect(isIterable([1, 2, 3])).toBeTrue();
    expect(isIterable([])).toBeTrue();
  });

  test('returns true for strings', () => {
    expect(isIterable('hello')).toBeTrue();
    expect(isIterable('')).toBeTrue();
  });

  test('returns true for Maps and Sets', () => {
    expect(isIterable(new Map())).toBeTrue();
    expect(isIterable(new Set())).toBeTrue();
  });

  test('returns true for generator objects', () => {
    expect(isIterable(gen())).toBeTrue();
  });

  test('returns false for numbers', () => {
    expect(isIterable(123)).toBeFalse();
    expect(isIterable(NaN)).toBeFalse();
  });

  test('returns false for booleans', () => {
    expect(isIterable(true)).toBeFalse();
    expect(isIterable(false)).toBeFalse();
  });

  test('returns false for null and undefined', () => {
    expect(isIterable(null)).toBeFalse();
    expect(isIterable(undefined)).toBeFalse();
  });

  test('returns false for plain objects', () => {
    expect(isIterable({})).toBeFalse();
    expect(isIterable({ a: 1 })).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isIterable(() => {})).toBeFalse();
    expect(isIterable(fn)).toBeFalse();
  });

  test('returns false for symbols', () => {
    expect(isIterable(Symbol('sym'))).toBeFalse();
  });
});
