import { type LineSegment } from './geometry.ts';

/**
 * Returns a `LineSegment` where the point with the higher y-coordinate is always the starting point (x0, y0).
 * If the original line's y1 is greater than y0, the line is returned as-is.
 * Otherwise, the start and end points are swapped.
 *
 * @param line - The line segment to process.
 * @returns A `LineSegment` with the topmost point as the starting point.
 *
 * @group Geometry
 * @category Line Segment
 */
export function topPointFirst(line: LineSegment): LineSegment {
  return line.y1 > line.y0 ? line : { x0: line.x1, y0: line.y1, x1: line.x0, y1: line.y0 };
}
