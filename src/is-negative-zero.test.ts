import { negativeZero } from './constants.ts';
import { isNegativeZero } from './is-negative-zero.ts';

describe('isNegativeZero', () => {
  test('should handle testing for negative zero', () => {
    expect(isNegativeZero(-3)).toBeFalse();
    expect(isNegativeZero(-2)).toBeFalse();
    expect(isNegativeZero(-1)).toBeFalse();
    expect(isNegativeZero(negativeZero)).toBeTrue();
    expect(isNegativeZero(0)).toBeFalse();
    expect(isNegativeZero(1)).toBeFalse();
    expect(isNegativeZero(2)).toBeFalse();
    expect(isNegativeZero(3)).toBeFalse();
    expect(isNegativeZero(Number.MAX_VALUE)).toBeFalse();
    expect(isNegativeZero(Number.MIN_VALUE)).toBeFalse();
    expect(isNegativeZero(Number.NaN)).toBeFalse();
    expect(isNegativeZero(Infinity)).toBeFalse();
    expect(isNegativeZero(-Infinity)).toBeFalse();
  });
});
