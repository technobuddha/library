import { getDenominators } from '../get-denominators.ts';

describe('getDenominators', () => {
  test('returns the default common denominators when input is "common"', () => {
    expect(getDenominators('common')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 12]);
  });

  test('returns the wrench denominators when input is "wrench"', () => {
    expect(getDenominators('wrench')).toEqual([1, 2, 4, 8, 16, 32]);
  });

  test('returns the custom denominators array when input is an array', () => {
    expect(getDenominators([2, 5, 10])).toEqual([2, 5, 10]);
    expect(getDenominators([])).toEqual([]);
    expect(getDenominators([1])).toEqual([1]);
    expect(getDenominators([3, 6, 9, 12])).toEqual([3, 6, 9, 12]);
  });
});
