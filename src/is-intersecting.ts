import { type LineSegment, type Polygon } from './@types/geometry.ts';
import { isOnLine } from './is-on-line.ts';
import { isPolygon } from './is-polygon.ts';
import { lineIntersection } from './line-intersection.ts';
import { toClosed } from './to-closed.ts';
import { toLineSegment } from './to-line-segment.ts';

/**
 * Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon.
 *
 * @param shape - The shape to test for intersection, which can be either a LineSegment or a Polygon.
 * @param polygon - The polygon to test against.
 * @returns `true` if the shape intersects with the polygon, otherwise `false`.
 *
 * @remarks
 * - If `shape` is a Polygon, the function checks if any of its edges intersect with the given polygon,
 *   or if two of its vertices lie on the polygon.
 * - If `shape` is a LineSegment, the function checks if it intersects with any edge of the polygon,
 *   or if both endpoints of a polygon edge lie on the line segment.
 *
 * @group Geometry
 * @category Line Segment
 * @category Polygon
 */
export function isIntersecting(shape: LineSegment | Polygon, polygon: Polygon): boolean;
export function isIntersecting(shape: LineSegment | Polygon, polygon: Polygon): boolean {
  if (isPolygon(shape)) {
    let intersects = false;
    const closed = toClosed(shape);

    for (let i = 0, l = closed.length - 1; i < l; i++) {
      const v0 = closed[i];
      const v1 = closed[i + 1];

      if (isIntersecting(toLineSegment(v0, v1), polygon)) {
        intersects = true;
        break;
      }
    }

    return intersects;
  }

  let intersects = false;
  const closed = toClosed(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i];
    const v1 = closed[i + 1];

    if (
      lineIntersection(shape, toLineSegment(v0, v1)) ||
      (isOnLine(v0, shape) && isOnLine(v1, shape))
    ) {
      intersects = true;
      break;
    }
  }

  return intersects;
}
