import { negativeZero } from './constants.js';
import { isEven } from './is-even.js';

describe('isEven', () => {
  test('should work with numbers', () => {
    expect(isEven(-3)).toBeFalse();
    expect(isEven(-2)).toBeTrue();
    expect(isEven(-1)).toBeFalse();
    expect(isEven(0)).toBeTrue();
    expect(isEven(1)).toBeFalse();
    expect(isEven(2)).toBeTrue();
    expect(isEven(3)).toBeFalse();
    expect(isEven(negativeZero)).toBeTrue();
    expect(isEven(Number.NaN)).toBeFalse();
    expect(isEven(Infinity)).toBeFalse();
    expect(isEven(-Infinity)).toBeFalse();
  });

  test('should work with special numbers', () => {
    expect(isEven(negativeZero)).toBeTrue();
    expect(isEven(Number.NaN)).toBeFalse();
    expect(isEven(Infinity)).toBeFalse();
    expect(isEven(-Infinity)).toBeFalse();
  });
});
