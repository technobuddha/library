import { round } from './round.ts';

describe('round', () => {
  test('should handle positive numbers', () => {
    expect(round(1.4)).toBe(1);
    expect(round(1.5)).toBe(2);
    expect(round(2.49)).toBe(2);
    expect(round(2.5)).toBe(3);
    expect(round(3)).toBe(3);
  });

  test('should handle negative numbers', () => {
    expect(round(-1.4)).toBe(-1);
    expect(round(-1.5)).toBe(-1);
    expect(round(-2.49)).toBe(-2);
    expect(round(-2.5)).toBe(-2);
    expect(round(-3)).toBe(-3);
  });

  test('should handle precision', () => {
    expect(round(1.2345, { precision: 2 })).toBe(1.23);
    expect(round(1.2355, { precision: 2 })).toBe(1.24);
    expect(round(-1.2345, { precision: 2 })).toBe(-1.23);
    expect(round(-1.2355, { precision: 2 })).toBe(-1.24);
    expect(round(12345, { precision: -2 })).toBe(12300);
    expect(round(12555, { precision: -2 })).toBe(12600);
    expect(round(-12345, { precision: -2 })).toBe(-12300);
    expect(round(-12555, { precision: -2 })).toBe(-12600);
  });

  test('should return NaN or Infinity as is', () => {
    expect(round(NaN)).toBeNaN();
    expect(round(Infinity)).toBe(Infinity);
    expect(round(-Infinity)).toBe(-Infinity);
  });

  test('should handle zero', () => {
    expect(round(0)).toBe(0);
    expect(round(-0)).toBe(-0);
    expect(Object.is(round(-0), -0)).toBeTrue();
  });
});
