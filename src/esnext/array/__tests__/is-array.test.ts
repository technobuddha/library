import { isArray } from '../is-array.ts';

describe('isArray', () => {
  test('returns true for arrays', () => {
    expect(isArray([1, 2, 3])).toBeTrue();
    expect(isArray([])).toBeTrue();
    expect(isArray(new Array<string>('a', 'b'))).toBeTrue();
  });

  test('returns false for non-array values', () => {
    expect(isArray('hello')).toBeFalse();
    expect(isArray({ length: 2 })).toBeFalse();
    expect(isArray(null)).toBeFalse();
    expect(isArray(undefined)).toBeFalse();
    expect(isArray({ 0: 'a', length: 1 })).toBeFalse();
    expect(isArray(() => {})).toBeFalse();
    expect(isArray(123)).toBeFalse();
    expect(isArray(true)).toBeFalse();
    expect(isArray(Symbol('sym'))).toBeFalse();
    expect(isArray(0n)).toBeFalse();
  });

  test('narrows the value type', () => {
    const value: unknown = [1, 2, 3];

    if (isArray<number>(value)) {
      expect(value).toEqual([1, 2, 3]);
      expect(value.map((item) => item + 1)).toEqual([2, 3, 4]);
    } else {
      throw new Error('Expected value to be an array');
    }
  });
});
