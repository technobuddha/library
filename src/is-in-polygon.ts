import { type Cartesian, type Polygon, type Rect } from './@types/geometry.ts';
import { isIntersecting } from './is-intersecting.ts';
import { isOnLine } from './is-on-line.ts';
import { isPolygon } from './is-polygon.ts';
import { isRect } from './is-rect.ts';
import { toClosed } from './to-closed.ts';
import { toLineSegment } from './to-line-segment.ts';

/**
 * Determines whether a given point or rectangle is inside or on the edge of a polygon.
 *
 * @param object - The point or rectangle to test.
 * @param polygon - The polygon to test against, represented as an array of Cartesian coordinates.
 * @returns `true` if the object is inside the polygon or on its edge, otherwise `false`.
 * @example
 * ```typescript
 * isInPolygon(
 *   { x: 5, y: 5 },
 *   [{ x: 0, y: 0 }, { x: 10, y: 0}, { x: 10, y: 10 }, { x: 0, y: 10 }]
 * ); // true
 * ```
 * @remarks
 * - The polygon is assumed to be a simple, non-self-intersecting polygon.
 * - Points on the edge of the polygon return `true`.
 * - For rectangles, all corners must be inside the polygon.
 * - Uses ray-casting algorithm with explicit edge detection.
 *
 * @group Geometry
 * @category Polygon
 * @category Point
 * @category Rectangle
 */
export function isInPolygon(object: Cartesian | Rect | Polygon, polygon: Polygon): boolean {
  if (polygon.length < 3) {
    return false;
  }

  if (isPolygon(object)) {
    let inside = true;
    const closed = toClosed(object);

    for (let i = 0, l = closed.length - 1; i < l; i++) {
      const v0 = closed[i];

      // Points test
      if (!isInPolygon(v0, polygon)) {
        inside = false;
        break;
      }

      // Lines test
      if (isIntersecting(toLineSegment(v0, closed[i + 1]), polygon)) {
        inside = false;
        break;
      }
    }

    return inside;
  }

  if (isRect(object)) {
    const { x, y, width, height } = object;

    const corners = [
      { x, y },
      { x: x + width, y },
      { x: x + width, y: y + height },
      { x, y: y + height },
    ];

    return corners.every((corner) => isInPolygon(corner, polygon));
  }

  // First check if point is on any edge
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];

    if (isOnLine(object, toLineSegment(p1, p2))) {
      return true;
    }
  }

  // Use ray-casting algorithm for interior points
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pi = polygon[i];
    const pj = polygon[j];

    if (
      pi.y > object.y !== pj.y > object.y &&
      object.x < ((pj.x - pi.x) * (object.y - pi.y)) / (pj.y - pi.y) + pi.x
    ) {
      inside = !inside;
    }
  }

  return inside;
}
