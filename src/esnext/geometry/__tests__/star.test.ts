import { type Cartesian } from '../geometry.ts';
import { star } from '../star.ts';

describe('star', () => {
  test('creates a 5-pointed star with default origin', () => {
    const points = star(5, 10, 5);
    expect(points).toHaveLength(10);
    // Outer points should be at distance 10 from origin
    for (let i = 0; i < points.length; i += 2) {
      const { x, y } = points[i];
      expect(Math.abs(Math.hypot(x, y) - 10)).toBeLessThan(1e-10);
    }
    // Inner points should be at distance 5 from origin
    for (let i = 1; i < points.length; i += 2) {
      const { x, y } = points[i];
      expect(Math.abs(Math.hypot(x, y) - 5)).toBeLessThan(1e-10);
    }
  });

  test('creates a 3-pointed star (triangle)', () => {
    const points = star(3, 2, 1);
    expect(points).toHaveLength(6);
  });

  test('throws if sides < 3', () => {
    expect(() => star(2)).toThrow(TypeError);
    expect(() => star(0)).toThrow(TypeError);
  });

  test('uses default inner radius if not provided', () => {
    const points = star(4, 8);
    // inner should be 4
    for (let i = 1; i < points.length; i += 2) {
      const { x, y } = points[i];
      expect(Math.abs(Math.hypot(x, y) - 4)).toBeLessThan(1e-10);
    }
  });

  test('accepts custom origin', () => {
    const origin: Cartesian = { x: 100, y: -50 };
    const points = star(5, 10, 5, { origin });
    for (const point of points) {
      // All points should be offset by origin
      expect(point.x).toBeGreaterThan(80);
      expect(point.y).toBeLessThan(-35);
    }
  });

  test('returns correct number of points', () => {
    expect(star(7, 3, 1.5)).toHaveLength(14);
    expect(star(8, 2, 1)).toHaveLength(16);
  });
});
