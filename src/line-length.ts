import { type LineSegment } from './@types/geometry.ts';

/**
 * Calculates the length of a given line segment using the distance formula.
 *
 * @param line - The line segment for which to calculate the length.
 * @returns The length of the line segment.
 *
 * @group Geometry
 * @category Line Segment
 */
export function lineLength(line: LineSegment): number {
  // Calculate the length of the line segment using the distance formula
  return Math.hypot(line.x1 - line.x0, line.y1 - line.y0);
}
