import { crossProduct } from './cross-product.ts';
import { type Cartesian, type Polygon } from './geometry.ts';

/**
 * Computes the convex hull of a set of 2D points using the Monotone Chain algorithm.
 * @see {@link https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript| Monotone Chain}
 * @param vertices - An array of points.
 * @returns The convex hull as an array of points in counterclockwise order, or `undefined` if there are fewer than 3 vertices.
 * @example
 * ```typescript
 * convexHull([
 *   { x: 0, y: 0 },
 *   { x: 1, y: 1 },
 *   { x: 2, y: 0 },
 *   { x: 1, y: -1 }
 * ]);
 * // hull is now the convex hull of the points
 * ```
 * @remarks
 * - The returned array does not repeat the starting point at the end.
 * - Points on the edge of the hull may be included or excluded depending on their order.
 * @group Geometry
 * @category Polygon
 */
export function convexHull(vertices: Cartesian[]): Polygon | undefined {
  if (vertices.length < 3) {
    return undefined;
  }

  const points = vertices.toSorted((a, b) => a.x - b.x || a.y - b.y);

  const lower: Polygon = [];
  for (const point of points) {
    while (lower.length >= 2 && crossProduct(lower.at(-2)!, lower.at(-1)!, point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }

  const upper: Polygon = [];
  for (const point of points.reverse()) {
    while (upper.length >= 2 && crossProduct(upper.at(-2)!, upper.at(-1)!, point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
}
