import { deconstructNumber } from './deconstruct-number.ts';

type DeconstructNumberReturn = ReturnType<typeof deconstructNumber>;

describe('deconstructNumber', () => {
  test('should deconstruct positive integers', () => {
    expect(deconstructNumber(42)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 42,
      mantissa: '42',
      exponent: 1,
      whole: {
        sign: 1,
        value: 42,
        mantissa: '42',
        exponent: 1,
      },
      fraction: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
    });
    expect(deconstructNumber(0)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 0,
      mantissa: '',
      exponent: 0,
      whole: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
      fraction: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
    });
  });

  test('should deconstruct negative integers', () => {
    expect(deconstructNumber(-7)).toEqual<DeconstructNumberReturn>({
      sign: -1,
      value: 7,
      mantissa: '7',
      exponent: 0,
      whole: {
        sign: -1,
        value: 7,
        mantissa: '7',
        exponent: 0,
      },
      fraction: {
        sign: -1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
    });
  });

  test('should deconstruct floats', () => {
    expect(deconstructNumber(Math.PI)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 3.14159265,
      mantissa: '314159265',
      exponent: 0,
      whole: {
        sign: 1,
        value: 3,
        mantissa: '3',
        exponent: 0,
      },
      fraction: {
        sign: 1,
        value: 0.14159265,
        mantissa: '14159265',
        exponent: -1,
      },
    });
    expect(deconstructNumber(-Math.E)).toEqual<DeconstructNumberReturn>({
      sign: -1,
      value: 2.71828183,
      mantissa: '271828183',
      exponent: 0,
      whole: {
        sign: -1,
        value: 2,
        mantissa: '2',
        exponent: 0,
      },
      fraction: {
        sign: -1,
        value: 0.71828183,
        mantissa: '71828183',
        exponent: -1,
      },
    });
  });

  test('should deconstruct small numbers', () => {
    expect(deconstructNumber(1.23456789e-30)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 1.23456789e-30,
      mantissa: '123456789',
      exponent: -30,
      whole: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
      fraction: {
        sign: 1,
        value: 1.23456789e-30,
        mantissa: '123456789',
        exponent: -30,
      },
    });
  });

  test('should deconstruct large numbers', () => {
    expect(deconstructNumber(1.23456789e30)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 1.23456789e30,
      mantissa: '123456789',
      exponent: 30,
      whole: {
        sign: 1,
        value: 1.23456789e30,
        mantissa: '123456789',
        exponent: 30,
      },
      fraction: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
    });
  });

  test('should round numbers', () => {
    expect(deconstructNumber(0.999999999)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 0.999999999,
      mantissa: '999999999',
      exponent: -1,
      whole: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
      fraction: {
        sign: 1,
        value: 0.999999999,
        mantissa: '999999999',
        exponent: -1,
      },
    });
    expect(deconstructNumber(0.9999999999)).toEqual<DeconstructNumberReturn>({
      sign: 1,
      value: 1,
      mantissa: '1',
      exponent: 0,
      whole: {
        sign: 1,
        value: 1,
        mantissa: '1',
        exponent: 0,
      },
      fraction: {
        sign: 1,
        value: 0,
        mantissa: '',
        exponent: 0,
      },
    });
  });

  test('should handle special numbers', () => {
    expect(() => deconstructNumber(Number.NaN)).toThrow(TypeError);
    expect(() => deconstructNumber(Number.POSITIVE_INFINITY)).toThrow(TypeError);
    expect(() => deconstructNumber(Number.NEGATIVE_INFINITY)).toThrow(TypeError);
  });
});
