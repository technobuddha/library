import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { crossProduct } from './cross-product.ts';
import { normalizeLineSegment } from './normalize-line-segment.ts';

/**
 * Determines whether a given point lies to the left of a specified line segment.
 *
 * @param point - The Cartesian point to test.
 * @param line - The line segment to compare against.
 * @returns `true` if the point is to the left of the line segment; otherwise, `false`.
 * @example
 * ```typescript
 * isLeftOfLine({ x: 5, y: 5 }, { x0: 0, y0: 0, x1: 10, y1: 0 }); // true
 * ```
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isLeftOfLine(point: Cartesian, line: LineSegment): boolean {
  const tpf = normalizeLineSegment(line);
  return crossProduct(point, { x: tpf.x0, y: tpf.y0 }, { x: tpf.x1, y: tpf.y1 }) < 0;
}
