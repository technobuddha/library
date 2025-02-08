import { type Polygon } from './@types/geometry.ts';

/**
 * Calculates the area of a polygon given its vertices.
 *
 * The area is computed using the shoelace formula (also known as Gauss's area formula),
 * which sums the cross products of the edges. The function can return either the signed
 * area (which indicates the orientation of the vertices) or the absolute area.
 *
 * @param vertices - An array of points representing the polygon's vertices, where each point has `x` and `y` properties.
 * @param signed - If `true`, returns the signed area (positive for counter-clockwise, negative for clockwise). Defaults to `false`.
 * @returns The area of the polygon.
 *
 * @group Geometry
 * @category Polygon
 */
export function area(vertices: Polygon, signed = false): number {
  let a = 0;

  for (const [index, vertex0] of vertices.entries()) {
    const vertex1 = vertices[(index + 1) % vertices.length];

    a += (vertex1.x - vertex0.x) * (vertex1.y + vertex0.y);
  }

  return signed ? a / 2 : Math.abs(a / 2);
}
