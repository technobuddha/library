import { type Polygon } from './@types/geometry.ts';
import { lineLength } from './line-length.ts';
import { modulo } from './modulo.ts';

/**
 * Calculates the perimeter of a polygon.
 * @param polygon - The polygon.
 * @returns The total perimeter length of the polygon.
 * @example
 * ```typescript
 * const polygon: Polygon = [
 *   { x: 0, y: 0 },
 *   { x: 10, y: 0 },
 *   { x: 10, y: 10 },
 *   { x: 0, y: 10 }
 * ];
 * const result = perimeter(polygon);
 * // result: 40
 * ```
 * @group Geometry
 * @category Polygon
 */
export function perimeter(polygon: Polygon): number {
  let total = 0;

  for (const [index, vertex0] of polygon.entries()) {
    const vertex1 = polygon[modulo(index + 1, polygon.length)];

    total += lineLength({ x0: vertex0.x, y0: vertex0.y, x1: vertex1.x, y1: vertex1.y });
  }

  return total;
}
