import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { crossProduct } from './cross-product.ts';
import { lineLength } from './line-length.ts';

/**
 * Options for the {@link isOnLine} function
 * @group Geometry
 * @category Line Segment
 */
export type OnLineOptions = {
  /**
   * Optional tolerance for floating-point comparison.
   * @defaultValue 1e-10
   */
  tolerance?: number;
  /**
   * If true, treats the segments as infinite lines; if false, only considers the actual segments.
   * @defaultValue false
   */
  extend?: boolean;
};

/**
 * Determines whether a given point lies on a specified line segment or its extension.
 * @param point - The Cartesian coordinates of the point to test.
 * @param line - The line segment defined by its endpoints.
 * @param options - see {@link OnLineOptions}
 * @returns `true` if the point lies on the line segment (or its extension if `extend` is true), otherwise `false`.
 * @example
 * ```typescript
 * isOnLine({ x: 2, y: 2 }, { x0: 0, y0: 0, x1: 4, y1: 4 }); // true
 * ```
 * @group Geometry
 * @category Line Segment
 * @category Point
 */
export function isOnLine(
  point: Cartesian,
  line: LineSegment,
  { tolerance = 1e-10, extend = false }: OnLineOptions = {},
): boolean {
  const isOnExtendedLine =
    Math.abs(crossProduct(point, { x: line.x0, y: line.y0 }, { x: line.x1, y: line.y1 })) <
    tolerance;

  if (extend) {
    return isOnExtendedLine;
  }

  const len = lineLength(line);
  return (
    isOnExtendedLine &&
    lineLength({ x0: line.x0, y0: line.y0, x1: point.x, y1: point.y }) <= len &&
    lineLength({ x0: line.x1, y0: line.y1, x1: point.x, y1: point.y }) <= len
  );
}
