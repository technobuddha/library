import { type Cartesian, type LineSegment } from './@types/geometry.ts';

/**
 * Calculates a point at a given fraction (`part`) along a line segment.  By default it returns the
 * true midpoint of the line segment
 *
 * @param line - The line segment defined by its start (`x0`, `y0`) and end (`x1`, `y1`) coordinates.
 * @param part - The fraction along the line segment at which to calculate the point (default is `0.5` for the midpoint).
 * @returns The Cartesian coordinates of the calculated point.
 *
 * @group Geometry
 * @category Line Segment
 */
export function midpoint(line: LineSegment, part = 0.5): Cartesian {
  // Calculate the midpoint of the line segment
  return {
    x: line.x0 + (line.x1 - line.x0) * part,
    y: line.y0 + (line.y1 - line.y0) * part,
  };
}
