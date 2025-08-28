import { type Cartesian, type LineSegment } from './@types/geometry.ts';

/**
 * Converts two Cartesian points into a `LineSegment` object.
 * @param pointA - The starting point of the line segment.
 * @param pointB - The ending point of the line segment.
 * @returns A `LineSegment` object representing the line from `pointA` to `pointB`.
 * @group Geometry
 * @category Line Segment
 */
export function toLineSegment(pointA: Cartesian, pointB: Cartesian): LineSegment {
  return {
    x0: pointA.x,
    y0: pointA.y,
    x1: pointB.x,
    y1: pointB.y,
  };
}
