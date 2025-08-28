import { isIterator } from './is-iterator.ts';

function* gen(): Generator<number> {
  yield 1;
}

function fn(): void {
  // noop
}

describe('isIterator', () => {
  test('returns true for array iterators', () => {
    const arr = [1, 2, 3];
    const iter = arr[Symbol.iterator]();
    expect(isIterator(iter)).toBeTrue();
  });

  test('returns true for generator objects', () => {
    const generator = gen();
    expect(isIterator(generator)).toBeTrue();
  });

  test('returns true for custom iterator objects', () => {
    const customIter = {
      next: () => ({ done: true, value: undefined }),
    };
    expect(isIterator(customIter)).toBeTrue();
  });

  test('returns false for arrays', () => {
    expect(isIterator([1, 2, 3])).toBeFalse();
    expect(isIterator([])).toBeFalse();
  });

  test('returns false for strings', () => {
    expect(isIterator('hello')).toBeFalse();
    expect(isIterator('')).toBeFalse();
  });

  test('returns false for Maps and Sets', () => {
    expect(isIterator(new Map())).toBeFalse();
    expect(isIterator(new Set())).toBeFalse();
  });

  test('returns false for numbers', () => {
    expect(isIterator(123)).toBeFalse();
    expect(isIterator(NaN)).toBeFalse();
  });

  test('returns false for booleans', () => {
    expect(isIterator(true)).toBeFalse();
    expect(isIterator(false)).toBeFalse();
  });

  test('returns false for null and undefined', () => {
    expect(isIterator(null)).toBeFalse();
    expect(isIterator(undefined)).toBeFalse();
  });

  test('returns false for plain objects', () => {
    expect(isIterator({})).toBeFalse();
    expect(isIterator({ a: 1 })).toBeFalse();
  });

  test('returns false for functions', () => {
    expect(isIterator(() => {})).toBeFalse();
    expect(isIterator(fn)).toBeFalse();
  });

  test('returns false for symbols', () => {
    expect(isIterator(Symbol('sym'))).toBeFalse();
  });
});
