import { type Cartesian, type LineSegment } from './geometry.ts';

/**
 * Calculates the intersection point of two line segments.
 * @param a - The first line segment.
 * @param b - The second line segment.
 * @param extend - If `true`, treats the segments as infinite lines; if `false`, only considers the actual segments.
 * @returns The intersection point as a `Point` object if the segments (or lines, if `extend` is `true`) intersect.
 *          Returns `undefined` if the lines are parallel or coincident.
 *          Returns `null` if the intersection is outside the segments and `extend` is `false`.
 * @example
 * ```typescript
 * lineIntersection(
 *   { x0: 0, y0: 0, x1: 4, y1: 4 },
 *   { x0: 0, y0: 4, x1: 4, y1: 0 }
 * ); // { x: 2, y: 2 }
 * ```
 * @group Geometry
 * @category Line Segment
 */
export function lineIntersection(
  a: LineSegment,
  b: LineSegment,
  extend = false,
): Cartesian | null | undefined {
  const denominator = (b.y1 - b.y0) * (a.x1 - a.x0) - (b.x1 - b.x0) * (a.y1 - a.y0);

  if (denominator === 0) {
    // Lines are parallel or coincident
    return undefined;
  }

  const ua = ((b.x1 - b.x0) * (a.y0 - b.y0) - (b.y1 - b.y0) * (a.x0 - b.x0)) / denominator;
  const ub = ((a.x1 - a.x0) * (a.y0 - b.y0) - (a.y1 - a.y0) * (a.x0 - b.x0)) / denominator;

  if (!extend && (ua < 0 || ua > 1 || ub < 0 || ub > 1)) {
    return null; // Intersection is outside the line segments
  }

  return {
    x: a.x0 + ua * (a.x1 - a.x0),
    y: a.y0 + ua * (a.y1 - a.y0),
  };
}
