import { type Polygon } from './geometry.ts';
import { lineLength } from './line-length.ts';
import { modulo } from './modulo.ts';

/**
 * Calculates the perimeter of a polygon given its vertices.
 *
 * @param vertices - An array of points representing the vertices of the polygon in order.
 * @returns The total perimeter length of the polygon.
 */
export function perimeter(vertices: Polygon): number {
  let total = 0;

  for (const [index, vertex0] of vertices.entries()) {
    const vertex1 = vertices[modulo(index + 1, vertices.length)];

    total += lineLength({ x0: vertex0.x, y0: vertex0.y, x1: vertex1.x, y1: vertex1.y });
  }

  return total;
}
