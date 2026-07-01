import { negativeZero } from '../constants.ts';
import { isMultipleOf } from '../is-multiple-of.ts';

describe('isMultipleOf', () => {
  test('should work with numbers', () => {
    expect(isMultipleOf(-6, 3)).toBeTrue();
    expect(isMultipleOf(-3, 3)).toBeTrue();
    expect(isMultipleOf(0, 3)).toBeTrue();
    expect(isMultipleOf(3, 3)).toBeTrue();
    expect(isMultipleOf(6, 3)).toBeTrue();

    expect(isMultipleOf(-6, 2)).toBeTrue();
    expect(isMultipleOf(-3, 2)).toBeFalse();
    expect(isMultipleOf(0, 2)).toBeTrue();
    expect(isMultipleOf(3, 2)).toBeFalse();
    expect(isMultipleOf(6, 2)).toBeTrue();

    expect(isMultipleOf(-6, -3)).toBeTrue();
    expect(isMultipleOf(-3, -3)).toBeTrue();
    expect(isMultipleOf(0, -3)).toBeTrue();
    expect(isMultipleOf(3, -3)).toBeTrue();
    expect(isMultipleOf(6, -3)).toBeTrue();

    expect(isMultipleOf(-6, -2)).toBeTrue();
    expect(isMultipleOf(-3, -2)).toBeFalse();
    expect(isMultipleOf(0, -2)).toBeTrue();
    expect(isMultipleOf(3, -2)).toBeFalse();
    expect(isMultipleOf(6, -2)).toBeTrue();

    expect(isMultipleOf(-6, 0)).toBeFalse();
    expect(isMultipleOf(-3, 0)).toBeFalse();
    expect(isMultipleOf(0, 0)).toBeTrue();
    expect(isMultipleOf(3, 0)).toBeFalse();
    expect(isMultipleOf(6, 0)).toBeFalse();
  });

  test('should work with special numbers', () => {
    expect(isMultipleOf(negativeZero, 1)).toBeTrue();
    expect(isMultipleOf(1, negativeZero)).toBeFalse();
    expect(isMultipleOf(negativeZero, negativeZero)).toBeTrue();
    expect(isMultipleOf(NaN, 1)).toBeFalse();
    expect(isMultipleOf(1, NaN)).toBeFalse();
    expect(isMultipleOf(NaN, NaN)).toBeFalse();
    expect(isMultipleOf(Infinity, 1)).toBeFalse();
    expect(isMultipleOf(1, Infinity)).toBeFalse();
    expect(isMultipleOf(Infinity, Infinity)).toBeFalse();
    expect(isMultipleOf(-Infinity, 1)).toBeFalse();
    expect(isMultipleOf(1, -Infinity)).toBeFalse();
    expect(isMultipleOf(-Infinity, -Infinity)).toBeFalse();
  });
});
