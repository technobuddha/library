import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { crossProduct } from './cross-product.ts';

/**
 * Determines whether a given point lies on a specified line segment within a certain tolerance.
 *
 * @param point - The Cartesian coordinates of the point to test.
 * @param line - The line segment, defined by its endpoints.
 * @param epsilon - Optional tolerance for floating-point comparison (default is 1e-10).
 * @returns `true` if the point lies on the line segment within the given tolerance, otherwise `false`.
 *
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isWithLine(point: Cartesian, line: LineSegment, epsilon = 1e-10): boolean {
  return (
    Math.abs(crossProduct(point, { x: line.x0, y: line.y0 }, { x: line.x1, y: line.y1 })) < epsilon
  );
}
