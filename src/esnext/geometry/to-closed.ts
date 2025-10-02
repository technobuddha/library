import { type Polygon } from './geometry.ts';
import { isClosed } from './is-closed.ts';

/**
 * Ensures that a given polygon is closed by checking if the first and last points are the same.
 * If the polygon is not closed, it appends the first point to the end of the array.
 * @param polygon - The array of points representing the polygon.
 * @returns A closed polygon, where the first and last points are identical.
 * @group Geometry
 * @category Polygon
 */
export function toClosed(polygon: Polygon): Polygon {
  return isClosed(polygon) ? polygon : [...polygon, polygon[0]];
}
