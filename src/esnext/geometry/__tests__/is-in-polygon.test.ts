import { type Polygon, type Rect } from '../geometry.ts';
import { isInPolygon } from '../is-in-polygon.ts';

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

describe('isInPolygon', () => {
  test('returns true for a point clearly inside a square', () => {
    expect(isInPolygon({ x: 5, y: 5 }, square)).toBeTrue();
  });

  test('returns false for a point clearly outside a square', () => {
    expect(isInPolygon({ x: 15, y: 5 }, square)).toBeFalse();
  });

  test('returns true for a point on the edge of a square', () => {
    expect(isInPolygon({ x: 0, y: 5 }, square)).toBeTrue();
    expect(isInPolygon({ x: 10, y: 5 }, square)).toBeTrue();
    expect(isInPolygon({ x: 5, y: 0 }, square)).toBeTrue();
    expect(isInPolygon({ x: 5, y: 10 }, square)).toBeTrue();
  });

  test('returns true for a point inside a triangle', () => {
    expect(isInPolygon({ x: 5, y: 5 }, triangle)).toBeTrue();
  });

  test('returns false for a point outside a triangle', () => {
    expect(isInPolygon({ x: 5, y: -1 }, triangle)).toBeFalse();
  });

  test('returns true for a point on the edge of a triangle', () => {
    expect(isInPolygon({ x: 0, y: 0 }, triangle)).toBeTrue();
    expect(isInPolygon({ x: 5, y: 10 }, triangle)).toBeTrue();
    expect(isInPolygon({ x: 10, y: 0 }, triangle)).toBeTrue();
    // Test points on the edges (not just vertices)
    expect(isInPolygon({ x: 2.5, y: 5 }, triangle)).toBeTrue(); // left edge
    expect(isInPolygon({ x: 7.5, y: 5 }, triangle)).toBeTrue(); // right edge
    expect(isInPolygon({ x: 5, y: 0 }, triangle)).toBeTrue(); // bottom edge
  });

  test('returns true for a point inside a concave polygon', () => {
    expect(isInPolygon({ x: 5, y: 8 }, concave)).toBeTrue();
  });

  test('returns false for a point in the "dent" of a concave polygon', () => {
    expect(isInPolygon({ x: 5, y: 3 }, concave)).toBeFalse();
  });

  test('returns false for a point outside a concave polygon', () => {
    expect(isInPolygon({ x: 11, y: 5 }, concave)).toBeFalse();
  });

  test('returns true for a point on a vertex', () => {
    expect(isInPolygon({ x: 0, y: 0 }, square)).toBeTrue();
    expect(isInPolygon({ x: 10, y: 0 }, square)).toBeTrue();
    expect(isInPolygon({ x: 10, y: 10 }, square)).toBeTrue();
    expect(isInPolygon({ x: 0, y: 10 }, square)).toBeTrue();
  });

  test('returns true for points on concave polygon edges', () => {
    // Test edge from (0,0) to (5,5)
    expect(isInPolygon({ x: 2.5, y: 2.5 }, concave)).toBeTrue();
    // Test edge from (5,5) to (10,0)
    expect(isInPolygon({ x: 7.5, y: 2.5 }, concave)).toBeTrue();
    // Test vertical edge from (10,0) to (10,10)
    expect(isInPolygon({ x: 10, y: 5 }, concave)).toBeTrue();
    // Test horizontal edge from (10,10) to (0,10)
    expect(isInPolygon({ x: 5, y: 10 }, concave)).toBeTrue();
    // Test vertical edge from (0,10) to (0,0)
    expect(isInPolygon({ x: 0, y: 5 }, concave)).toBeTrue();
  });

  test('handles floating point precision on edges', () => {
    // Points very close to edges should still be considered on the edge
    expect(isInPolygon({ x: 5.000000000001, y: 0 }, square)).toBeTrue();
    expect(isInPolygon({ x: 0, y: 4.999999999999 }, square)).toBeTrue();
    expect(isInPolygon({ x: 9.999999999999, y: 5 }, square)).toBeTrue();
  });

  test('handles horizontal and vertical edges correctly', () => {
    const rect: Polygon = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 5 },
      { x: 0, y: 5 },
    ];

    // Horizontal edges
    expect(isInPolygon({ x: 5, y: 0 }, rect)).toBeTrue(); // bottom edge
    expect(isInPolygon({ x: 5, y: 5 }, rect)).toBeTrue(); // top edge
    expect(isInPolygon({ x: 2.5, y: 0 }, rect)).toBeTrue(); // bottom edge midpoint
    expect(isInPolygon({ x: 7.5, y: 5 }, rect)).toBeTrue(); // top edge midpoint

    // Vertical edges
    expect(isInPolygon({ x: 0, y: 2.5 }, rect)).toBeTrue(); // left edge
    expect(isInPolygon({ x: 10, y: 2.5 }, rect)).toBeTrue(); // right edge
  });

  test('returns false for a degenerate polygon (line)', () => {
    const line: Polygon = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    expect(isInPolygon({ x: 5, y: 0 }, line)).toBeFalse();
  });

  test('returns false for a degenerate polygon (single point)', () => {
    const pointPoly: Polygon = [{ x: 1, y: 1 }];
    expect(isInPolygon({ x: 1, y: 1 }, pointPoly)).toBeFalse();
  });

  test('returns false for an empty polygon', () => {
    expect(isInPolygon({ x: 0, y: 0 }, [])).toBeFalse();
  });

  // Test with a rectangle
  test('rectangle fully inside square', () => {
    const rect: Rect = { x: 2, y: 2, width: 5, height: 5 };
    expect(isInPolygon(rect, square)).toBeTrue();
  });

  test('rectangle partially outside square', () => {
    const rect: Rect = { x: 8, y: 8, width: 5, height: 5 };
    expect(isInPolygon(rect, square)).toBeFalse();
  });

  test('rectangle exactly matches square', () => {
    const rect: Rect = { x: 0, y: 0, width: 10, height: 10 };
    expect(isInPolygon(rect, square)).toBeTrue(); // Changed: boundary points are now considered inside
  });

  test('rectangle fully outside square', () => {
    const rect: Rect = { x: 20, y: 20, width: 2, height: 2 };
    expect(isInPolygon(rect, square)).toBeFalse();
  });

  test('rectangle inside triangle', () => {
    const rect: Rect = { x: 3, y: 2, width: 2, height: 2 };
    expect(isInPolygon(rect, triangle)).toBeTrue();
  });

  test('rectangle partially outside triangle', () => {
    const rect: Rect = { x: 4, y: 8, width: 3, height: 3 };
    expect(isInPolygon(rect, triangle)).toBeFalse();
  });

  test('rectangle inside concave polygon', () => {
    const rect: Rect = { x: 4, y: 6, width: 2, height: 2 };
    expect(isInPolygon(rect, concave)).toBeTrue(); // Changed: this rectangle is actually inside
  });

  test('rectangle in concavity (partially outside)', () => {
    const rect: Rect = { x: 4, y: 2, width: 2, height: 2 };
    expect(isInPolygon(rect, concave)).toBeFalse();
  });

  test('rectangle with zero width or height', () => {
    const rect1: Rect = { x: 2, y: 2, width: 0, height: 5 };
    const rect2: Rect = { x: 2, y: 2, width: 5, height: 0 };
    expect(isInPolygon(rect1, square)).toBeTrue(); // line inside polygon
    expect(isInPolygon(rect2, square)).toBeTrue(); // Changed: removed conflicting comment
  });

  test('empty polygon', () => {
    const rect: Rect = { x: 1, y: 1, width: 2, height: 2 };
    expect(isInPolygon(rect, [])).toBeFalse();
  });

  test('degenerate polygon (line)', () => {
    const line: Polygon = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    const rect: Rect = { x: 1, y: 0, width: 2, height: 2 };
    expect(isInPolygon(rect, line)).toBeFalse();
  });

  test('polygon completely inside another polygon', () => {
    const innerTriangle: Polygon = [
      { x: 0.2, y: 0.2 },
      { x: 0.8, y: 0.2 },
      { x: 0.5, y: 0.8 },
    ];
    const outerSquare: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isInPolygon(innerTriangle, outerSquare)).toBeTrue();
  });

  test('polygon partially outside another polygon', () => {
    const partialTriangle: Polygon = [
      { x: 5, y: 5 },
      { x: 15, y: 5 },
      { x: 10, y: 15 },
    ];
    expect(isInPolygon(partialTriangle, square)).toBeFalse();
  });

  test('polygon completely outside another polygon', () => {
    const outsideTriangle: Polygon = [
      { x: 20, y: 20 },
      { x: 30, y: 20 },
      { x: 25, y: 30 },
    ];
    expect(isInPolygon(outsideTriangle, square)).toBeFalse();
  });

  test('polygon edge intersects with another polygon', () => {
    const intersectingTriangle: Polygon = [
      { x: 5, y: -5 },
      { x: 15, y: 5 },
      { x: 5, y: 15 },
    ];
    expect(isInPolygon(intersectingTriangle, square)).toBeFalse();
  });
});
