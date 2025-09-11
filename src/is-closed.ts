import { type Polygon } from './@types/geometry.ts';

/**
 * Determines whether a given polygon is closed.
 *
 * A polygon is considered closed if it has more than one point and
 * its first and last points have identical `x` and `y` coordinates.
 * @param polygon - An array of points representing the polygon, where each point has `x` and `y` properties.
 * @returns `true` if the polygon is closed; otherwise, `false`.
 * @group Geometry
 * @category Polygon
 */
export function isClosed(polygon: Polygon): boolean {
  if (polygon.length > 1) {
    const first = polygon.at(0)!;
    const last = polygon.at(-1)!;
    return first.x === last.x && first.y === last.y;
  }
  return true;
}
