import { clamp } from './clamp.ts';

describe('clamp', () => {
  test('returns the value when within the range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(0, -5, 5)).toBe(0);
  });

  test('returns min when value is less than min', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(-10, -5, 5)).toBe(-5);
  });

  test('returns max when value is greater than max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, -5, 5)).toBe(5);
  });

  test('returns min when value equals min', () => {
    expect(clamp(1, 1, 10)).toBe(1);
    expect(clamp(-5, -5, 5)).toBe(-5);
  });

  test('returns max when value equals max', () => {
    expect(clamp(10, 1, 10)).toBe(10);
    expect(clamp(5, -5, 5)).toBe(5);
  });

  test('works when min and max are equal', () => {
    expect(clamp(5, 5, 5)).toBe(5);
    expect(clamp(0, 0, 0)).toBe(0);
    expect(clamp(-1, -1, -1)).toBe(-1);
  });

  test('works with negative ranges', () => {
    expect(clamp(-7, -10, -5)).toBe(-7);
    expect(clamp(-11, -10, -5)).toBe(-10);
    expect(clamp(-4, -10, -5)).toBe(-5);
  });
});
