import { type Polygon, type Rect } from './geometry.ts';
import { isRectangleInPolygon } from './is-rectangle-in-polygon.ts';

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
  { x: 5, y: 10 },
];

describe('isRectangleInsidePolygon', () => {
  test('rectangle fully inside square', () => {
    const rect: Rect = { x: 2, y: 2, width: 5, height: 5 };
    expect(isRectangleInPolygon(rect, square)).toBeTrue();
  });

  test('rectangle partially outside square', () => {
    const rect: Rect = { x: 8, y: 8, width: 5, height: 5 };
    expect(isRectangleInPolygon(rect, square)).toBeFalse();
  });

  test('rectangle exactly matches square', () => {
    const rect: Rect = { x: 0, y: 0, width: 10, height: 10 };
    expect(isRectangleInPolygon(rect, square)).toBeTrue(); // Changed: boundary points are now considered inside
  });

  test('rectangle fully outside square', () => {
    const rect: Rect = { x: 20, y: 20, width: 2, height: 2 };
    expect(isRectangleInPolygon(rect, square)).toBeFalse();
  });

  test('rectangle inside triangle', () => {
    const rect: Rect = { x: 3, y: 2, width: 2, height: 2 };
    expect(isRectangleInPolygon(rect, triangle)).toBeTrue();
  });

  test('rectangle partially outside triangle', () => {
    const rect: Rect = { x: 4, y: 8, width: 3, height: 3 };
    expect(isRectangleInPolygon(rect, triangle)).toBeFalse();
  });

  test('rectangle inside concave polygon', () => {
    const rect: Rect = { x: 4, y: 6, width: 2, height: 2 };
    expect(isRectangleInPolygon(rect, concave)).toBeTrue(); // Changed: this rectangle is actually inside
  });

  test('rectangle in concavity (partially outside)', () => {
    const rect: Rect = { x: 4, y: 2, width: 2, height: 2 };
    expect(isRectangleInPolygon(rect, concave)).toBeFalse();
  });

  test('rectangle with zero width or height', () => {
    const rect1: Rect = { x: 2, y: 2, width: 0, height: 5 };
    const rect2: Rect = { x: 2, y: 2, width: 5, height: 0 };
    expect(isRectangleInPolygon(rect1, square)).toBeTrue(); // line inside polygon
    expect(isRectangleInPolygon(rect2, square)).toBeTrue(); // Changed: removed conflicting comment
  });

  test('empty polygon', () => {
    const rect: Rect = { x: 1, y: 1, width: 2, height: 2 };
    expect(isRectangleInPolygon(rect, [])).toBeFalse();
  });

  test('degenerate polygon (line)', () => {
    const line: Polygon = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    const rect: Rect = { x: 1, y: 0, width: 2, height: 2 };
    expect(isRectangleInPolygon(rect, line)).toBeFalse();
  });
});
