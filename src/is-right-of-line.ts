import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { crossProduct } from './cross-product.ts';
import { normalizeLineSegment } from './normalize-line-segment.ts';

/**
 * Determines whether a given point lies to the right of a specified line segment.
 * @param point - The Cartesian point to test.
 * @param line - The line segment to compare against.
 * @returns `true` if the point is to the right of the line segment; otherwise, `false`.
 * @example
 * ```typescript
 * isRightOfLine({ x: 2, y: 2 }, { x0: 0, y0: 0, x1: 4, y1: 4 }); // false
 * isRightOfLine({ x: 3, y: 1 }, { x0: 0, y0: 0, x1: 4, y1: 4 }); // true
 * ```
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isRightOfLine(point: Cartesian, line: LineSegment): boolean {
  const tpf = normalizeLineSegment(line);
  return crossProduct(point, { x: tpf.x0, y: tpf.y0 }, { x: tpf.x1, y: tpf.y1 }) > 0;
}
