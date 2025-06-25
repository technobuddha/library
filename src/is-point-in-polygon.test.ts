import { type Polygon } from './geometry.ts';
import { isPointInPolygon } from './is-point-in-polygon.ts';

// Helper polygons
const square: Polygon = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

const triangle: Polygon = [
  { x: 0, y: 0 },
  { x: 5, y: 10 },
  { x: 10, y: 0 },
];

const concave: Polygon = [
  { x: 0, y: 0 },
  { x: 5, y: 5 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

describe('isPointInPolygon', () => {
  test('returns true for a point clearly inside a square', () => {
    expect(isPointInPolygon({ x: 5, y: 5 }, square)).toBeTrue();
  });

  test('returns false for a point clearly outside a square', () => {
    expect(isPointInPolygon({ x: 15, y: 5 }, square)).toBeFalse();
  });

  test('returns true for a point on the edge of a square', () => {
    expect(isPointInPolygon({ x: 0, y: 5 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 10, y: 5 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 5, y: 0 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 5, y: 10 }, square)).toBeTrue();
  });

  test('returns true for a point inside a triangle', () => {
    expect(isPointInPolygon({ x: 5, y: 5 }, triangle)).toBeTrue();
  });

  test('returns false for a point outside a triangle', () => {
    expect(isPointInPolygon({ x: 5, y: -1 }, triangle)).toBeFalse();
  });

  test('returns true for a point on the edge of a triangle', () => {
    expect(isPointInPolygon({ x: 0, y: 0 }, triangle)).toBeTrue();
    expect(isPointInPolygon({ x: 5, y: 10 }, triangle)).toBeTrue();
    expect(isPointInPolygon({ x: 10, y: 0 }, triangle)).toBeTrue();
    // Test points on the edges (not just vertices)
    expect(isPointInPolygon({ x: 2.5, y: 5 }, triangle)).toBeTrue(); // left edge
    expect(isPointInPolygon({ x: 7.5, y: 5 }, triangle)).toBeTrue(); // right edge
    expect(isPointInPolygon({ x: 5, y: 0 }, triangle)).toBeTrue(); // bottom edge
  });

  test('returns true for a point inside a concave polygon', () => {
    expect(isPointInPolygon({ x: 5, y: 8 }, concave)).toBeTrue();
  });

  test('returns false for a point in the "dent" of a concave polygon', () => {
    expect(isPointInPolygon({ x: 5, y: 3 }, concave)).toBeFalse();
  });

  test('returns false for a point outside a concave polygon', () => {
    expect(isPointInPolygon({ x: 11, y: 5 }, concave)).toBeFalse();
  });

  test('returns true for a point on a vertex', () => {
    expect(isPointInPolygon({ x: 0, y: 0 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 10, y: 0 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 10, y: 10 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 0, y: 10 }, square)).toBeTrue();
  });

  test('returns true for points on concave polygon edges', () => {
    // Test edge from (0,0) to (5,5)
    expect(isPointInPolygon({ x: 2.5, y: 2.5 }, concave)).toBeTrue();
    // Test edge from (5,5) to (10,0)
    expect(isPointInPolygon({ x: 7.5, y: 2.5 }, concave)).toBeTrue();
    // Test vertical edge from (10,0) to (10,10)
    expect(isPointInPolygon({ x: 10, y: 5 }, concave)).toBeTrue();
    // Test horizontal edge from (10,10) to (0,10)
    expect(isPointInPolygon({ x: 5, y: 10 }, concave)).toBeTrue();
    // Test vertical edge from (0,10) to (0,0)
    expect(isPointInPolygon({ x: 0, y: 5 }, concave)).toBeTrue();
  });

  test('handles floating point precision on edges', () => {
    // Points very close to edges should still be considered on the edge
    expect(isPointInPolygon({ x: 5.000000000001, y: 0 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 0, y: 4.999999999999 }, square)).toBeTrue();
    expect(isPointInPolygon({ x: 9.999999999999, y: 5 }, square)).toBeTrue();
  });

  test('handles horizontal and vertical edges correctly', () => {
    const rect: Polygon = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 5 },
      { x: 0, y: 5 },
    ];

    // Horizontal edges
    expect(isPointInPolygon({ x: 5, y: 0 }, rect)).toBeTrue(); // bottom edge
    expect(isPointInPolygon({ x: 5, y: 5 }, rect)).toBeTrue(); // top edge
    expect(isPointInPolygon({ x: 2.5, y: 0 }, rect)).toBeTrue(); // bottom edge midpoint
    expect(isPointInPolygon({ x: 7.5, y: 5 }, rect)).toBeTrue(); // top edge midpoint

    // Vertical edges
    expect(isPointInPolygon({ x: 0, y: 2.5 }, rect)).toBeTrue(); // left edge
    expect(isPointInPolygon({ x: 10, y: 2.5 }, rect)).toBeTrue(); // right edge
  });

  test('returns false for a degenerate polygon (line)', () => {
    const line: Polygon = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    expect(isPointInPolygon({ x: 5, y: 0 }, line)).toBeFalse();
  });

  test('returns false for a degenerate polygon (single point)', () => {
    const pointPoly: Polygon = [{ x: 1, y: 1 }];
    expect(isPointInPolygon({ x: 1, y: 1 }, pointPoly)).toBeFalse();
  });

  test('returns false for an empty polygon', () => {
    expect(isPointInPolygon({ x: 0, y: 0 }, [])).toBeFalse();
  });
});
