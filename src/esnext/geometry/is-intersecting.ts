import { lookAhead } from '../iteration/look-ahead.ts';

import { type LineSegment, type Polygon } from './geometry.ts';
import { isOnLine } from './is-on-line.ts';
import { isPolygon } from './is-polygon.ts';
import { lineIntersection } from './line-intersection.ts';
import { toClosed } from './to-closed.ts';
import { toLineSegment } from './to-line-segment.ts';

/**
 * Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon.
 * @param shape - The shape to test for intersection, which can be either a LineSegment or a Polygon.
 * @param polygon - The polygon to test against.
 * @returns `true` if the shape intersects with the polygon, otherwise `false`.
 * @example
 * ```typescript
 * isIntersecting(
 *   { x0: -1, y0: 0.5, x1: 2, y1: 0.5 },
 *   [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 } ],
 * ); // true
 * isIntersecting(
 *   [ { x: 0, y: 0 }, { x: 2, y: 0 },  { x: 1, y: 2 } ],
 *   [ { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 } ],
 * ); // true
 * ```
 * @remarks
 * - If `shape` is a Polygon, the function checks if any of its edges intersect with the given polygon,
 *   or if two of its vertices lie on the polygon.
 * - If `shape` is a LineSegment, the function checks if it intersects with any edge of the polygon,
 *   or if both endpoints of a polygon edge lie on the line segment.
 * @group Geometry
 * @category Polygon
 */
export function isIntersecting(shape: LineSegment | Polygon, polygon: Polygon): boolean {
  if (isPolygon(shape)) {
    let didIntersect = false;
    for (const [v0, v1] of lookAhead(toClosed(shape))) {
      if (isIntersecting(toLineSegment(v0, v1), polygon)) {
        didIntersect = true;
        break;
      }
    }

    return didIntersect;
  }

  let didIntersect = false;
  for (const [v0, v1] of lookAhead(toClosed(polygon))) {
    if (
      lineIntersection(shape, toLineSegment(v0, v1)) ||
      (isOnLine(v0, shape) && isOnLine(v1, shape))
    ) {
      didIntersect = true;
      break;
    }
  }

  return didIntersect;
}
