import { type Cartesian, type LineSegment } from './geometry.ts';

/**
 * Determines whether a given point lies on a specified line segment.
 *
 * The function first checks if the point is within the bounding box of the segment,
 * allowing for a small epsilon tolerance to account for floating-point inaccuracies.
 * It then checks if the point is collinear with the segment using the cross product.
 *
 * @param point - The point to test, represented as a Cartesian coordinate.
 * @param segment - The line segment, defined by its two endpoints as Cartesian coordinates.
 * @returns `true` if the point lies on the line segment (within a small epsilon tolerance), otherwise `false`.
 *
 * @group Geometry
 * @category LineSegment
 * @category Point
 */
export function isPointOnLineSegment(point: Cartesian, segment: LineSegment): boolean {
  const epsilon = 1e-10;

  // Check if point is within bounding box of line segment
  const minX = Math.min(segment.x0, segment.x1);
  const maxX = Math.max(segment.x0, segment.x1);
  const minY = Math.min(segment.y0, segment.y1);
  const maxY = Math.max(segment.y0, segment.y1);

  if (
    point.x < minX - epsilon ||
    point.x > maxX + epsilon ||
    point.y < minY - epsilon ||
    point.y > maxY + epsilon
  ) {
    return false;
  }

  // Check if point is collinear with the line segment
  const crossProduct =
    (point.y - segment.y0) * (segment.x1 - segment.x0) -
    (point.x - segment.x0) * (segment.y1 - segment.y0);
  return Math.abs(crossProduct) < epsilon;
}
