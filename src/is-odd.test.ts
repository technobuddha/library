import { isOdd } from './is-odd.js';

describe('isOdd', () => {
  test('should handle testing for odd numbers', () => {
    expect(isOdd(-3)).toBeTrue();
    expect(isOdd(-2)).toBeFalse();
    expect(isOdd(-1)).toBeTrue();
    expect(isOdd(0)).toBeFalse();
    expect(isOdd(1)).toBeTrue();
    expect(isOdd(2)).toBeFalse();
    expect(isOdd(3)).toBeTrue();
    expect(isOdd(Number.NaN)).toBeFalse();
    expect(isOdd(Infinity)).toBeFalse();
    expect(isOdd(-Infinity)).toBeFalse();
  });
});
