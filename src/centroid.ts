import { type Cartesian, type Polygon } from './geometry.ts';
import { modulo } from './modulo.ts';

/**
 * Calculates the centroid (geometric center) of a polygon given its vertices.
 *
 * The centroid is computed using the formula for the centroid of a non-self-intersecting closed polygon.
 * The vertices should be provided in order (either clockwise or counterclockwise).
 *
 * @param vertices - An array of points representing the vertices of the polygon.
 * @returns The centroid as a Cartesian coordinate.
 *
 * @remarks
 * - The function assumes the polygon is non-self-intersecting.
 *
 * @group Geometry
 * @category Polygon
 */
export function centroid(vertices: Polygon): Cartesian {
  let a = 0;
  let x = 0;
  let y = 0;

  for (let i = 0; i < vertices.length; ++i) {
    const j = modulo(i + 1, vertices.length);
    const v0 = vertices[i];
    const v1 = vertices[j];
    const f = v0.x * v1.y - v1.x * v0.y;

    a += f;
    x += (v0.x + v1.x) * f;
    y += (v0.y + v1.y) * f;
  }

  const d = a * 3;

  return { x: x / d, y: y / d };
}
