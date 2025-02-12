import { type Cartesian } from './coordinates.js';
import { normalizeAngle } from './normalize-angle.js';
/**
 * Computes the angle between two points (x1,y1) and (x2,y2).
 * Angle zero points in the +X direction, PI/2 radians points in the +Y
 * direction (down) and from there we grow clockwise towards PI*2 radians.
 *
 * @param a - first point.
 * @param b - second.
 * @returns Standardized angle in radians of the vector from *a* to *b*.
 * @group Geometry
 * @category Angle Between Points
 */
export function angleBetweenPoints(a: Cartesian, b: Cartesian): number {
  return normalizeAngle(Math.atan2(b.y - a.y, b.x - a.x));
}
