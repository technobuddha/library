import { floor } from '../floor.ts';

describe('floor', () => {
  test('should handle positive numbers', () => {
    expect(floor(1 - Number.EPSILON)).toBe(1);
    expect(floor(2 - Number.EPSILON)).toBe(2);
    expect(floor(3 - Number.EPSILON)).toBe(3);
  });

  test('should handle negative numbers', () => {
    expect(floor(-1 - Number.EPSILON)).toBe(-1);
    expect(floor(-2 - Number.EPSILON)).toBe(-2);
    expect(floor(-3 - Number.EPSILON)).toBe(-3);
  });

  test('should handle tolerance', () => {
    expect(floor(5.9, { tolerance: 0.1 })).toBe(6);
    expect(floor(-5.9, { tolerance: 0.1 })).toBe(-6);
  });

  test('should handle precision', () => {
    expect(floor(6.01 - Number.EPSILON, { precision: 2 })).toBe(6.01);
    expect(floor(6100 - Number.EPSILON, { precision: -2 })).toBe(6100);
    expect(floor(-6.01 - Number.EPSILON, { precision: 2 })).toBe(-6.01);
    expect(floor(-6100 - Number.EPSILON, { precision: -2 })).toBe(-6100);
  });

  test('should handle NaN and Infinity', () => {
    expect(floor(Number.NaN)).toBe(Number.NaN);
    expect(floor(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
    expect(floor(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
  });
});
