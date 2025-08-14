import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { crossProduct } from './cross-product.ts';
import { topPointFirst } from './top-point-first.ts';

/**
 * Determines whether a given point lies to the left of a specified line segment.
 *
 * @param point - The Cartesian point to test.
 * @param line - The line segment to compare against.
 * @returns `true` if the point is to the left of the line segment; otherwise, `false`.
 *
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isLeftOfLine(point: Cartesian, line: LineSegment): boolean {
  const tpf = topPointFirst(line);
  return crossProduct(point, { x: tpf.x0, y: tpf.y0 }, { x: tpf.x1, y: tpf.y1 }) < 0;
}
