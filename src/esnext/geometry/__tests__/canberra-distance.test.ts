import { canberraDistance } from '../canberra-distance.ts';

describe('canberraDistance', () => {
  test('returns 0 for identical points', () => {
    const a: { x: number; y: number } = { x: 3, y: -5 };
    expect(canberraDistance(a, a)).toBe(0);
  });

  test('calculates correct distance for positive coordinates', () => {
    const a: { x: number; y: number } = { x: 1, y: 2 };
    const b: { x: number; y: number } = { x: 4, y: 6 };
    // x: |1-4|/(|1|+|4|) = 3/5 = 0.6
    // y: |2-6|/(|2|+|6|) = 4/8 = 0.5
    // total: 0.6 + 0.5 = 1.1
    expect(canberraDistance(a, b)).toBeCloseTo(1.1);
  });

  test('calculates correct distance for negative coordinates', () => {
    const a: { x: number; y: number } = { x: -2, y: -3 };
    const b: { x: number; y: number } = { x: -5, y: -7 };
    // x: |-2-(-5)|/(|-2|+|-5|) = 3/7 ≈ 0.42857142857142855
    // y: |-3-(-7)|/(|3|+|7|) = 4/10 = 0.4
    // total: ≈ 0.42857142857142855 + 0.4 = 0.8285714285714285
    expect(canberraDistance(a, b)).toBeCloseTo(0.8285714285714285);
  });

  test('calculates correct distance for mixed sign coordinates', () => {
    const a: { x: number; y: number } = { x: -2, y: 3 };
    const b: { x: number; y: number } = { x: 5, y: -7 };
    expect(canberraDistance(a, b)).toBeCloseTo(2.0);
  });

  test('handles zero coordinates', () => {
    const a: { x: number; y: number } = { x: 0, y: 0 };
    const b: { x: number; y: number } = { x: 4, y: 6 };
    expect(canberraDistance(a, b)).toBe(2);
  });

  test('handles division by zero (both coordinates zero)', () => {
    const a: { x: number; y: number } = { x: 0, y: 0 };
    const b: { x: number; y: number } = { x: 0, y: 0 };
    // 0/0 is NaN, so the function will return NaN + NaN = NaN
    expect(Number.isNaN(canberraDistance(a, b))).toBeTrue();
  });

  test('handles division by zero (one coordinate zero)', () => {
    const a: { x: number; y: number } = { x: 0, y: 5 };
    const b: { x: number; y: number } = { x: 0, y: -5 };
    // x part: 0/0 = NaN, y part: 10/10 = 1
    expect(Number.isNaN(canberraDistance(a, b))).toBeTrue();
  });
});
