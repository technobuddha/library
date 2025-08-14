import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { isWithLine } from './is-with-line.ts';
import { lineLength } from './line-length.ts';

/**
 * Determines whether a given point lies on a specified line segment within a certain tolerance.
 *
 * @param point - The Cartesian coordinates of the point to check.
 * @param line - The line segment defined by its endpoints.
 * @param epsilon - Optional tolerance for floating-point comparisons (default is 1e-10).
 * @returns `true` if the point lies on the line segment within the given tolerance, otherwise `false`.
 *
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isOnLine(point: Cartesian, line: LineSegment, epsilon = 1e-10): boolean {
  const len = lineLength(line);
  return (
    isWithLine(point, line, epsilon) &&
    lineLength({ x0: line.x0, y0: line.y0, x1: point.x, y1: point.y }) <= len &&
    lineLength({ x0: line.x1, y0: line.y1, x1: point.x, y1: point.y }) <= len
  );
}
