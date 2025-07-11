import { type Cartesian, type Polygon, type Rect } from './geometry.ts';

/**
 * Converts two Cartesian points or a rectangle into a `Polygon` object.
 *
 * When provided with two Cartesian points, the function constructs a rectangle
 * defined by these points as opposite corners. When provided with a `Rect`
 * object, it constructs a polygon representing the rectangle's corners.
 *
 * @param pointA - The first corner point of the rectangle (if using points).
 * @param pointB - The opposite corner point of the rectangle (if using points).
 * @returns A `Polygon` object representing the rectangle.
 *
 * @group Geometry
 * @category Polygon
 */
export function toPolygon(pointA: Cartesian, pointB: Cartesian): Polygon;
export function toPolygon(rect: Rect): Polygon;
export function toPolygon(arg1: Cartesian | Rect, arg2?: Cartesian): Polygon {
  if ('width' in arg1) {
    return [
      { x: arg1.x, y: arg1.y },
      { x: arg1.x + arg1.width, y: arg1.y },
      { x: arg1.x + arg1.width, y: arg1.y + arg1.height },
      { x: arg1.x, y: arg1.y + arg1.height },
    ];
  }

  return [
    { x: arg1.x, y: arg1.y },
    { x: arg2!.x, y: arg1.y },
    { x: arg2!.x, y: arg2!.y },
    { x: arg1.x, y: arg2!.y },
  ];
}
