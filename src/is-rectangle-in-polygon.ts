import { type Cartesian, type Rect } from './geometry.ts';
import { isPointInPolygon } from './is-point-in-polygon.ts';

/**
 * Determines whether a given rectangle is entirely contained within a polygon.
 *
 * Checks if all four corners of the rectangle are inside the specified polygon.
 *
 * @param rectangle - The rectangle to test, defined by its position and dimensions.
 * @param polygon - An array of points representing the vertices of the polygon in Cartesian coordinates.
 * @returns `true` if the rectangle is completely inside the polygon; otherwise, `false`.
 *
 * @group Geometry
 * @category Polygon
 * @category Rectangle
 */
export function isRectangleInPolygon(rectangle: Rect, polygon: Cartesian[]): boolean {
  const { x, y, width, height } = rectangle;

  const corners = [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ];

  return corners.every((corner) => isPointInPolygon(corner, polygon));
}
