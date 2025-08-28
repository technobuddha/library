import { type LineSegment } from './@types/geometry.ts';

/**
 * Calculates the length of a line segment.
 * @param line - The line segment for which to calculate the length.
 * @returns The length of the line segment.
 * @example
 * ```typescript
 * lineLength({ x0: 0, y0: 0, x1: 3, y1: 4 }); // 5
 * ```
 * @group Geometry
 * @category Line Segment
 */
export function lineLength(line: LineSegment): number {
  return Math.hypot(line.x1 - line.x0, line.y1 - line.y0);
}
