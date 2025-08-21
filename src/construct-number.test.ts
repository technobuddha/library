import { constructNumber } from './construct-number.ts';

describe('reconstructNumber', () => {
  test('should reconstruct positive integers', () => {
    expect(constructNumber({ sign: 1, mantissa: '42', exponent: 1 })).toBeCloseTo(42);

    expect(constructNumber({ sign: 1, mantissa: '', exponent: 0 })).toBeCloseTo(0);
  });

  test('should reconstruct negative integers', () => {
    expect(constructNumber({ sign: -1, mantissa: '7', exponent: 0 })).toBeCloseTo(-7);
  });

  test('should reconstruct floats', () => {
    expect(constructNumber({ sign: 1, mantissa: '314159265', exponent: 0 })).toBeCloseTo(
      3.14159265,
    );

    expect(constructNumber({ sign: -1, mantissa: '271828183', exponent: 0 })).toBeCloseTo(
      -2.71828183,
    );
  });

  test('should reconstruct small numbers', () => {
    expect(constructNumber({ sign: 1, mantissa: '123456789', exponent: -30 })).toBeCloseTo(
      1.23456789e-30,
    );
  });

  test('should reconstruct large numbers', () => {
    expect(constructNumber({ sign: 1, mantissa: '123456789', exponent: 30 })).toBeCloseTo(
      1.23456789e30,
    );
  });

  test('should reconstruct zero', () => {
    expect(constructNumber({ sign: 1, mantissa: '', exponent: 0 })).toBe(0);
    expect(constructNumber({ sign: -1, mantissa: '', exponent: 0 })).toBe(-0);
  });
});
