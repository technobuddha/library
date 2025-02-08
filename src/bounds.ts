import { type Polygon, type Rect } from './@types/geometry.ts';

/**
 * Calculates the axis-aligned bounding rectangle for a given polygon.
 *
 * @param vertices - An array of points representing the vertices of the polygon. Each vertex should have `x` and `y` properties.
 * @returns A `Rect` object representing the smallest rectangle that contains all the vertices of the polygon.
 * @throws `TypeError` If the polygon has fewer than three vertices.
 *
 * @group Geometry
 * @category Polygon
 */
export function bounds(vertices: Polygon): Rect {
  if (vertices.length < 3) {
    throw new TypeError('Cannot calculate bounds for an polygon with less than three sides.');
  }

  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;

  for (const vertex of vertices) {
    if (vertex.x < xMin) {
      xMin = vertex.x;
    }
    if (vertex.x > xMax) {
      xMax = vertex.x;
    }
    if (vertex.y < yMin) {
      yMin = vertex.y;
    }
    if (vertex.y > yMax) {
      yMax = vertex.y;
    }
  }

  return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin };
}
