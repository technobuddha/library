import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { crossProduct } from './cross-product.ts';
import { normalizeLineSegment } from './normalize-line-segment.ts';

/**
 * Determines whether a given point lies to the right of a specified line segment.
 *
 * @param point - The Cartesian point to test.
 * @param line - The line segment to compare against.
 * @returns `true` if the point is to the right of the line segment; otherwise, `false`.
 *
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isRightOfLine(point: Cartesian, line: LineSegment): boolean {
  const tpf = normalizeLineSegment(line);
  return crossProduct(point, { x: tpf.x0, y: tpf.y0 }, { x: tpf.x1, y: tpf.y1 }) > 0;
}
