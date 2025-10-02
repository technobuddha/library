import { euclideanDistance } from '../euclidean-distance.ts';
import { Origin } from '../geometry.ts';

describe('euclideanDistance', () => {
  test('returns 0 for identical points', () => {
    expect(euclideanDistance(Origin, Origin)).toBe(0);
  });

  test('calculates distance for (0,0) to (3,4)', () => {
    expect(euclideanDistance(Origin, { x: 3, y: 4 })).toBe(5);
  });

  test('calculates distance for negative coordinates', () => {
    expect(euclideanDistance({ x: -1, y: -1 }, { x: 2, y: 3 })).toBe(5);
  });

  test('calculates distance for swapped points', () => {
    expect(euclideanDistance({ x: 3, y: 4 }, Origin)).toBe(5);
  });

  test('calculates distance for floating point coordinates', () => {
    expect(euclideanDistance({ x: 0.5, y: 1.5 }, { x: 2.5, y: 4.5 })).toBeCloseTo(3.605551275);
  });

  test('calculates distance for large values', () => {
    expect(euclideanDistance({ x: 1e6, y: 1e6 }, { x: 0, y: 0 })).toBeCloseTo(Math.sqrt(2) * 1e6);
  });

  test('calculates distance for points on x axis', () => {
    expect(euclideanDistance({ x: 10, y: 0 }, { x: 0, y: 0 })).toBe(10);
  });

  test('calculates distance for points on y axis', () => {
    expect(euclideanDistance({ x: 0, y: 10 }, { x: 0, y: 0 })).toBe(10);
  });

  test('returns NaN for both points at infinity', () => {
    expect(euclideanDistance({ x: Infinity, y: Infinity }, { x: Infinity, y: Infinity })).toBeNaN();
  });

  test('returns Infinity for one point at infinity', () => {
    expect(euclideanDistance({ x: Infinity, y: 0 }, { x: 0, y: 0 })).toBe(Infinity);
  });

  test('returns NaN for one point with NaN', () => {
    expect(euclideanDistance({ x: NaN, y: 0 }, { x: 0, y: 0 })).toBeNaN();
  });
});
