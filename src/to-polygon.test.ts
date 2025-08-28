import { type Cartesian, type Rect } from './@types/geometry.ts';
import { toPolygon } from './to-polygon.ts';

describe('toPolygon', () => {
  describe('from Rect object', () => {
    test('creates polygon from positive rectangle', () => {
      const rect: Rect = { x: 10, y: 20, width: 30, height: 40 };
      const polygon = toPolygon(rect);

      expect(polygon).toHaveLength(4);
      expect(polygon).toEqual([
        { x: 10, y: 20 }, // top-left
        { x: 40, y: 20 }, // top-right
        { x: 40, y: 60 }, // bottom-right
        { x: 10, y: 60 }, // bottom-left
      ]);
    });

    test('creates polygon from rectangle at origin', () => {
      const rect: Rect = { x: 0, y: 0, width: 5, height: 5 };
      const polygon = toPolygon(rect);

      expect(polygon).toEqual([
        { x: 0, y: 0 },
        { x: 5, y: 0 },
        { x: 5, y: 5 },
        { x: 0, y: 5 },
      ]);
    });

    test('creates polygon from rectangle with negative position', () => {
      const rect: Rect = { x: -10, y: -20, width: 15, height: 25 };
      const polygon = toPolygon(rect);

      expect(polygon).toEqual([
        { x: -10, y: -20 },
        { x: 5, y: -20 },
        { x: 5, y: 5 },
        { x: -10, y: 5 },
      ]);
    });

    test('creates polygon from rectangle with zero width', () => {
      const rect: Rect = { x: 5, y: 10, width: 0, height: 20 };
      const polygon = toPolygon(rect);

      expect(polygon).toEqual([
        { x: 5, y: 10 },
        { x: 5, y: 10 },
        { x: 5, y: 30 },
        { x: 5, y: 30 },
      ]);
    });

    test('creates polygon from rectangle with zero height', () => {
      const rect: Rect = { x: 5, y: 10, width: 20, height: 0 };
      const polygon = toPolygon(rect);

      expect(polygon).toEqual([
        { x: 5, y: 10 },
        { x: 25, y: 10 },
        { x: 25, y: 10 },
        { x: 5, y: 10 },
      ]);
    });

    test('creates polygon from rectangle with negative dimensions', () => {
      const rect: Rect = { x: 10, y: 20, width: -5, height: -8 };
      const polygon = toPolygon(rect);

      expect(polygon).toEqual([
        { x: 10, y: 20 },
        { x: 5, y: 20 },
        { x: 5, y: 12 },
        { x: 10, y: 12 },
      ]);
    });

    test('creates polygon from rectangle with floating point values', () => {
      const rect: Rect = { x: 1.5, y: 2.7, width: 3.2, height: 4.8 };
      const polygon = toPolygon(rect);

      expect(polygon).toEqual([
        { x: 1.5, y: 2.7 },
        { x: 4.7, y: 2.7 },
        { x: 4.7, y: 7.5 },
        { x: 1.5, y: 7.5 },
      ]);
    });
  });

  describe('from two Cartesian points', () => {
    test('creates polygon from two positive points', () => {
      const pointA: Cartesian = { x: 1, y: 2 };
      const pointB: Cartesian = { x: 5, y: 8 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toHaveLength(4);
      expect(polygon).toEqual([
        { x: 1, y: 2 }, // pointA
        { x: 5, y: 2 }, // pointB.x, pointA.y
        { x: 5, y: 8 }, // pointB
        { x: 1, y: 8 }, // pointA.x, pointB.y
      ]);
    });

    test('creates polygon when pointA is bottom-right of pointB', () => {
      const pointA: Cartesian = { x: 10, y: 10 };
      const pointB: Cartesian = { x: 5, y: 5 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: 10, y: 10 },
        { x: 5, y: 10 },
        { x: 5, y: 5 },
        { x: 10, y: 5 },
      ]);
    });

    test('creates polygon from points with negative coordinates', () => {
      const pointA: Cartesian = { x: -5, y: -3 };
      const pointB: Cartesian = { x: -1, y: -7 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: -5, y: -3 },
        { x: -1, y: -3 },
        { x: -1, y: -7 },
        { x: -5, y: -7 },
      ]);
    });

    test('creates polygon from points crossing origin', () => {
      const pointA: Cartesian = { x: -2, y: -3 };
      const pointB: Cartesian = { x: 4, y: 5 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: -2, y: -3 },
        { x: 4, y: -3 },
        { x: 4, y: 5 },
        { x: -2, y: 5 },
      ]);
    });

    test('creates degenerate polygon from identical points', () => {
      const point: Cartesian = { x: 3, y: 7 };
      const polygon = toPolygon(point, point);

      expect(polygon).toEqual([
        { x: 3, y: 7 },
        { x: 3, y: 7 },
        { x: 3, y: 7 },
        { x: 3, y: 7 },
      ]);
    });

    test('creates polygon from points with same x coordinate', () => {
      const pointA: Cartesian = { x: 5, y: 2 };
      const pointB: Cartesian = { x: 5, y: 8 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: 5, y: 2 },
        { x: 5, y: 2 },
        { x: 5, y: 8 },
        { x: 5, y: 8 },
      ]);
    });

    test('creates polygon from points with same y coordinate', () => {
      const pointA: Cartesian = { x: 2, y: 5 };
      const pointB: Cartesian = { x: 8, y: 5 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: 2, y: 5 },
        { x: 8, y: 5 },
        { x: 8, y: 5 },
        { x: 2, y: 5 },
      ]);
    });

    test('creates polygon from points with floating point coordinates', () => {
      const pointA: Cartesian = { x: 1.1, y: 2.2 };
      const pointB: Cartesian = { x: 3.3, y: 4.4 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: 1.1, y: 2.2 },
        { x: 3.3, y: 2.2 },
        { x: 3.3, y: 4.4 },
        { x: 1.1, y: 4.4 },
      ]);
    });

    test('creates polygon at origin', () => {
      const pointA: Cartesian = { x: 0, y: 0 };
      const pointB: Cartesian = { x: 2, y: 3 };
      const polygon = toPolygon(pointA, pointB);

      expect(polygon).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 3 },
        { x: 0, y: 3 },
      ]);
    });
  });

  describe('polygon structure validation', () => {
    test('always returns exactly 4 vertices', () => {
      const rect: Rect = { x: 0, y: 0, width: 10, height: 10 };
      const polygonFromRect = toPolygon(rect);

      const pointA: Cartesian = { x: 0, y: 0 };
      const pointB: Cartesian = { x: 10, y: 10 };
      const polygonFromPoints = toPolygon(pointA, pointB);

      expect(polygonFromRect).toHaveLength(4);
      expect(polygonFromPoints).toHaveLength(4);
    });

    test('vertices form a proper rectangle structure', () => {
      const rect: Rect = { x: 1, y: 2, width: 4, height: 6 };
      const polygon = toPolygon(rect);

      // Check that opposite corners have the expected relationships
      const [topLeft, topRight, bottomRight, bottomLeft] = polygon;

      expect(topLeft.x).toBe(topRight.x - rect.width);
      expect(topLeft.y).toBe(bottomLeft.y - rect.height);
      expect(topRight.x).toBe(bottomRight.x);
      expect(topRight.y).toBe(bottomRight.y - rect.height);
      expect(bottomRight.x).toBe(bottomLeft.x + rect.width);
      expect(bottomRight.y).toBe(bottomLeft.y);
    });

    test('creates same polygon from equivalent Rect and points', () => {
      const rect: Rect = { x: 2, y: 3, width: 5, height: 7 };
      const polygonFromRect = toPolygon(rect);

      const pointA: Cartesian = { x: 2, y: 3 };
      const pointB: Cartesian = { x: 7, y: 10 };
      const polygonFromPoints = toPolygon(pointA, pointB);

      expect(polygonFromRect).toEqual(polygonFromPoints);
    });
  });
});
