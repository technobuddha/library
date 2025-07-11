import { centroid } from './centroid.ts';
import { type Polygon } from './geometry.ts';

describe('centroid', () => {
  test('should calculate centroid of a triangle', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 3 },
    ];
    const result = centroid(triangle);
    expect(result.x).toBeCloseTo(1, 5);
    expect(result.y).toBeCloseTo(1, 5);
  });

  test('should calculate centroid of a unit square', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const result = centroid(square);
    expect(result.x).toBeCloseTo(0.5, 5);
    expect(result.y).toBeCloseTo(0.5, 5);
  });

  test('should calculate centroid of a rectangle', () => {
    const rectangle: Polygon = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 0, y: 2 },
    ];
    const result = centroid(rectangle);
    expect(result.x).toBeCloseTo(2, 5);
    expect(result.y).toBeCloseTo(1, 5);
  });

  test('should handle polygons with negative coordinates', () => {
    const polygon: Polygon = [
      { x: -2, y: -2 },
      { x: 2, y: -2 },
      { x: 2, y: 2 },
      { x: -2, y: 2 },
    ];
    const result = centroid(polygon);
    expect(result.x).toBeCloseTo(0, 5);
    expect(result.y).toBeCloseTo(0, 5);
  });

  test('should calculate centroid of an irregular quadrilateral', () => {
    const quadrilateral: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 2 },
      { x: 1, y: 3 },
    ];
    const result = centroid(quadrilateral);
    // Expected values calculated using shoelace formula
    expect(result.x).toBeCloseTo(1.4545, 3);
    expect(result.y).toBeCloseTo(1.303, 3);
  });

  test('should handle counterclockwise vertex order', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 0 },
    ];
    const result = centroid(square);
    expect(result.x).toBeCloseTo(1, 5);
    expect(result.y).toBeCloseTo(1, 5);
  });

  test('should calculate centroid of a pentagon', () => {
    const pentagon: Polygon = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 1.5, y: 2 },
      { x: 0.5, y: 2 },
    ];
    const result = centroid(pentagon);
    expect(result.x).toBeCloseTo(1, 3);
    expect(result.y).toBeCloseTo(1.1333, 3);
  });

  test('should handle floating point coordinates', () => {
    const triangle: Polygon = [
      { x: 0.1, y: 0.1 },
      { x: 2.7, y: 0.3 },
      { x: 1.5, y: 3.9 },
    ];
    const result = centroid(triangle);
    expect(typeof result.x).toBe('number');
    expect(typeof result.y).toBe('number');
    expect(Number.isFinite(result.x)).toBeTrue();
    expect(Number.isFinite(result.y)).toBeTrue();
  });

  test('should handle very small polygon', () => {
    const tiny: Polygon = [
      { x: 0, y: 0 },
      { x: 0.001, y: 0 },
      { x: 0.001, y: 0.001 },
      { x: 0, y: 0.001 },
    ];
    const result = centroid(tiny);
    expect(result.x).toBeCloseTo(0.0005, 6);
    expect(result.y).toBeCloseTo(0.0005, 6);
  });

  test('should handle large coordinates', () => {
    const large: Polygon = [
      { x: 1000, y: 1000 },
      { x: 1002, y: 1000 },
      { x: 1002, y: 1002 },
      { x: 1000, y: 1002 },
    ];
    const result = centroid(large);
    expect(result.x).toBeCloseTo(1001, 5);
    expect(result.y).toBeCloseTo(1001, 5);
  });

  test('should calculate centroid of L-shaped polygon', () => {
    const lShape: Polygon = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
    ];
    const result = centroid(lShape);
    // L-shape centroid should be somewhere in the lower-left area
    expect(result.x).toBeGreaterThan(0);
    expect(result.x).toBeLessThan(1.5);
    expect(result.y).toBeGreaterThan(0);
    expect(result.y).toBeLessThan(1.5);
  });
});
