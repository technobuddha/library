import { type DeconstructedNumber, deconstructNumber } from './deconstruct-number.ts';

describe('deconstructNumber', () => {
  test('should deconstruct positive integers', () => {
    expect(deconstructNumber(42)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 42,
      fractional: 0,
      exponent: 1,
      mantissa: '420000000',
    });
    expect(deconstructNumber(0)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 0,
      fractional: 0,
      mantissa: '000000000',
      exponent: 0,
    });
  });

  test('should deconstruct negative integers', () => {
    expect(deconstructNumber(-7)).toEqual<DeconstructedNumber>({
      sign: -1,
      whole: 7,
      fractional: 0,
      mantissa: '700000000',
      exponent: 0,
    });
  });

  test('should deconstruct floats', () => {
    expect(deconstructNumber(Math.PI)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 3,
      fractional: 0.14159265,
      mantissa: '314159265',
      exponent: 0,
    });
    expect(deconstructNumber(-Math.E)).toEqual<DeconstructedNumber>({
      sign: -1,
      whole: 2,
      fractional: 0.71828183,
      mantissa: '271828183',
      exponent: 0,
    });
  });

  test('should deconstruct small numbers', () => {
    expect(deconstructNumber(1.23456789e-30)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 0,
      fractional: 1.23456789e-30,
      mantissa: '123456789',
      exponent: -30,
    });
  });

  test('should deconstruct large numbers', () => {
    expect(deconstructNumber(1.23456789e30)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 1.23456789e30,
      fractional: 0,
      mantissa: '123456789',
      exponent: 30,
    });
  });

  test('should round numbers', () => {
    expect(deconstructNumber(0.999999999)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 0,
      fractional: 0.999999999,
      mantissa: '999999999',
      exponent: -1,
    });
    expect(deconstructNumber(0.9999999999)).toEqual<DeconstructedNumber>({
      sign: 1,
      whole: 1,
      fractional: 0,
      mantissa: '100000000',
      exponent: 0,
    });
  });

  test('should handle special numbers', () => {
    expect(() => deconstructNumber(Number.NaN)).toThrow(TypeError);
    expect(() => deconstructNumber(Number.POSITIVE_INFINITY)).toThrow(TypeError);
    expect(() => deconstructNumber(Number.NEGATIVE_INFINITY)).toThrow(TypeError);
  });
});
