import { convexHull } from '../convex-hull.ts';
import { type Polygon } from '../geometry.ts';

describe('convexHull', () => {
  test('should return undefined for empty array', () => {
    const result = convexHull([]);
    expect(result).toBeUndefined();
  });

  test('should return undefined for single point', () => {
    const points: Polygon = [{ x: 1, y: 1 }];
    const result = convexHull(points);
    expect(result).toBeUndefined();
  });

  test('should return undefined for two points', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ];
    const result = convexHull(points);
    expect(result).toBeUndefined();
  });

  test('should return same triangle for already convex triangle', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
    ];
    const result = convexHull(triangle);
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    // Verify all original points are in the hull
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
        expect.objectContaining({ x: 2, y: 0 }),
        expect.objectContaining({ x: 1, y: 2 }),
      ]),
    );
  });

  test('should return square hull for square points', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];
    const result = convexHull(square);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    // All corner points should be in hull
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
        expect.objectContaining({ x: 2, y: 0 }),
        expect.objectContaining({ x: 2, y: 2 }),
        expect.objectContaining({ x: 0, y: 2 }),
      ]),
    );
  });

  test('should compute hull for points with interior points', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
      { x: 2, y: 2 }, // Interior point
      { x: 1, y: 1 }, // Interior point
      { x: 3, y: 3 }, // Interior point
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    // Only corner points should be in hull
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
        expect.objectContaining({ x: 4, y: 0 }),
        expect.objectContaining({ x: 4, y: 4 }),
        expect.objectContaining({ x: 0, y: 4 }),
      ]),
    );
    // Interior points should not be in hull
    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 2, y: 2 }),
        expect.objectContaining({ x: 1, y: 1 }),
        expect.objectContaining({ x: 3, y: 3 }),
      ]),
    );
  });

  test('should handle collinear points correctly', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 1, y: 1 },
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    // Should include endpoints of line and the off-line point
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
        expect.objectContaining({ x: 3, y: 0 }),
        expect.objectContaining({ x: 1, y: 1 }),
      ]),
    );
  });

  test('should handle duplicate points', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 0, y: 0 }, // Duplicate
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 1 }, // Duplicate
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
  });

  test('should work with negative coordinates', () => {
    const points: Polygon = [
      { x: -2, y: -2 },
      { x: 2, y: -2 },
      { x: 2, y: 2 },
      { x: -2, y: 2 },
      { x: 0, y: 0 }, // Interior point
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: -2, y: -2 }),
        expect.objectContaining({ x: 2, y: -2 }),
        expect.objectContaining({ x: 2, y: 2 }),
        expect.objectContaining({ x: -2, y: 2 }),
      ]),
    );
  });

  test('should handle floating point coordinates', () => {
    const points: Polygon = [
      { x: 0.1, y: 0.1 },
      { x: 2.7, y: 0.3 },
      { x: 2.5, y: 3.9 },
      { x: 0.5, y: 3.1 },
      { x: 1.5, y: 2.0 }, // Interior point
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
  });

  test('should compute hull for scattered random points', () => {
    const points: Polygon = [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 5, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 5 },
      { x: 0, y: 3 },
      { x: 2, y: 2 }, // Interior
      { x: 3, y: 3 }, // Interior
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result!.length).toBeGreaterThanOrEqual(3);
    expect(result!.length).toBeLessThanOrEqual(6);
  });

  test('should handle L-shaped point distribution', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    // L-shape has 5 extremal points on its convex hull
    expect(result).toHaveLength(5);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
        expect.objectContaining({ x: 3, y: 0 }),
        expect.objectContaining({ x: 3, y: 1 }),
        expect.objectContaining({ x: 1, y: 3 }),
        expect.objectContaining({ x: 0, y: 3 }),
      ]),
    );
    // Interior point should not be in hull
    expect(result).not.toEqual(expect.arrayContaining([expect.objectContaining({ x: 1, y: 1 })]));
  });

  test('should not repeat starting point at end', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    // First and last points should be different
    expect(result![0]).not.toEqual(result![result!.length - 1]);
  });

  test('should handle very small coordinate differences', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 0.001, y: 0 },
      { x: 0.001, y: 0.001 },
      { x: 0, y: 0.001 },
      { x: 0.0005, y: 0.0005 }, // Interior point
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
  });

  test('should handle large coordinates', () => {
    const points: Polygon = [
      { x: 1000000, y: 1000000 },
      { x: 1000002, y: 1000000 },
      { x: 1000002, y: 1000002 },
      { x: 1000000, y: 1000002 },
      { x: 1000001, y: 1000001 }, // Interior
    ];
    const result = convexHull(points);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
  });

  test('should preserve counterclockwise order', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const result = convexHull(points);

    expect(result).toBeDefined();
    expect(result).toHaveLength(4);

    // Check that points are in counterclockwise order using cross product
    const cross1 =
      (result![1].x - result![0].x) * (result![2].y - result![0].y) -
      (result![1].y - result![0].y) * (result![2].x - result![0].x);
    expect(cross1).toBeGreaterThan(0); // Positive for counterclockwise
  });

  test('should handle three collinear points', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const result = convexHull(points);

    // Three collinear points return the two extremal points (endpoints of the line)
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ x: 0, y: 0 }),
        expect.objectContaining({ x: 2, y: 2 }),
      ]),
    );
  });
});
