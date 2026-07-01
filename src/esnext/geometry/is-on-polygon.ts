import { type Cartesian, type Polygon } from './geometry.ts';
import { isOnLine } from './is-on-line.ts';
import { toClosed } from './to-closed.ts';
import { toLineSegment } from './to-line-segment.ts';

// Determines whether a point is located on one of the edges of a polygon.
// Returns a boolean.
/**
 * Determines whether a given point lies exactly on the boundary of a polygon.
 * @param point - The Cartesian coordinates of the point to test.
 * @param polygon - The polygon, represented as an array of Cartesian points.
 * @param tolerance - Optional tolerance for floating-point comparisons (default is 1e-10).
 * @returns `true` if the point lies on any edge of the polygon within the given tolerance, otherwise `false`.
 * @group Geometry
 * @category Polygon
 */
export function isOnPolygon(point: Cartesian, polygon: Polygon, tolerance = 1e-10): boolean {
  let isOwnPolygon = false;
  const closed = toClosed(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    if (isOnLine(point, toLineSegment(closed[i], closed[i + 1]), { tolerance })) {
      isOwnPolygon = true;
      break;
    }
  }

  return isOwnPolygon;
}
