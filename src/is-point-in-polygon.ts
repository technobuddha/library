import { type Cartesian, type Polygon } from './geometry.ts';
import { isPointOnLineSegment } from './is-point-on-line-segment.ts';
import { toLineSegment } from './to-line-segment.ts';

/**
 * Determines whether a given point is inside or on the edge of a polygon.
 *
 * @param point - The point to test, represented as a Cartesian coordinate.
 * @param polygon - The polygon to test against, represented as an array of Cartesian coordinates.
 * @returns `true` if the point is inside the polygon or on its edge, otherwise `false`.
 *
 * @remarks
 * - The polygon is assumed to be a simple, non-self-intersecting polygon.
 * - Points on the edge of the polygon return `true`.
 * - Uses ray-casting algorithm with explicit edge detection.
 *
 * @group Geometry
 * @category Polygon
 * @category Point
 */
export function isPointInPolygon(point: Cartesian, polygon: Polygon): boolean {
  if (polygon.length < 3) {
    return false;
  }

  // First check if point is on any edge
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];

    if (isPointOnLineSegment(point, toLineSegment(p1, p2))) {
      return true;
    }
  }

  // Use ray-casting algorithm for interior points
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pi = polygon[i];
    const pj = polygon[j];

    if (
      pi.y > point.y !== pj.y > point.y &&
      point.x < ((pj.x - pi.x) * (point.y - pi.y)) / (pj.y - pi.y) + pi.x
    ) {
      inside = !inside;
    }
  }

  return inside;
}
