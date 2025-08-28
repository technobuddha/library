import { type Cartesian, type Polygon, type Rect } from './@types/geometry.ts';

/**
 * Converts two {@link Cartesian} points into a {@link Polygon}.
 *
 * Construct a rectangle defined by two points as opposite corners.
 * @param pointA - The first corner point of the rectangle.
 * @param pointB - The opposite corner point of the rectangle.
 * @returns A rectangle shaped {@link Polygon}.
 *
 * @example
 * ```typescript
 * toPolygon({ x: 1, y: 2 }, { x: 4, y: 6 });
 * // [
 * //   { x: 1, y: 2 },
 * //   { x: 4, y: 2 },
 * //   { x: 4, y: 6 },
 * //   { x: 1, y: 6 }
 * // ]
 * ```
 *
 * @group Geometry
 * @category Polygon
 */
export function toPolygon(pointA: Cartesian, pointB: Cartesian): Polygon;
/**
 * Convert a {@link Rect} into a {@link Polygon}.
 *
 * Construct a rectangle defined by location and dimensions.
 * @param rect - The {@link Rect} to convert.
 * @returns A rectangle shaped {@link Polygon}.
 *
 * @example
 * ```typescript
 * toPolygon({ x: 1, y: 2, width: 3, height: 4 });
 * // [
 * //   { x: 1, y: 2 },
 * //   { x: 4, y: 2 },
 * //   { x: 4, y: 6 },
 * //   { x: 1, y: 6 }
 * // ]
 * ```
 *
 * @group Geometry
 * @category Polygon
 */
export function toPolygon(rect: Rect): Polygon;
/**
 * Converts two {@link Cartesian} points or a {@link Rect} into a {@link Polygon}.
 * @group Geometry
 * @category Polygon
 */
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
