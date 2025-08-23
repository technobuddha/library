import { manhattanDistance } from './manhattan-distance.ts';

describe('manhattanDistance', () => {
  test('returns 0 for the same point', () => {
    const point = { x: 0, y: 0 };
    expect(manhattanDistance(point, point)).toBe(0);
  });

  test('calculates distance between two positive points', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 4, y: 6 };
    expect(manhattanDistance(a, b)).toBe(7);
  });

  test('calculates distance when one point has negative coordinates', () => {
    const a = { x: -3, y: 2 };
    const b = { x: 1, y: -1 };
    expect(manhattanDistance(a, b)).toBe(7);
  });

  test('calculates distance when both points have negative coordinates', () => {
    const a = { x: -2, y: -5 };
    const b = { x: -7, y: -1 };
    expect(manhattanDistance(a, b)).toBe(9);
  });

  test('is symmetric', () => {
    const a = { x: 3, y: 8 };
    const b = { x: 1, y: 2 };
    expect(manhattanDistance(a, b)).toBe(manhattanDistance(b, a));
  });

  test('works when points are on the same x axis', () => {
    const a = { x: 5, y: 3 };
    const b = { x: 5, y: 10 };
    expect(manhattanDistance(a, b)).toBe(7);
  });

  test('works when points are on the same y axis', () => {
    const a = { x: 2, y: 7 };
    const b = { x: 9, y: 7 };
    expect(manhattanDistance(a, b)).toBe(7);
  });

  test('works with decimal values', () => {
    const a = { x: 1.5, y: 2.5 };
    const b = { x: 4.2, y: 6.1 };
    expect(manhattanDistance(a, b)).toBeCloseTo(Math.abs(1.5 - 4.2) + Math.abs(2.5 - 6.1));
  });
});
