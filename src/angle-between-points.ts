import { type AngleUnit } from './angle.ts';
import { type Cartesian } from './geometry.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';
/**
 * Computes the angle between two points (x1,y1) and (x2,y2).
 * Angle zero points in the +X direction, π/2 radians points in the +Y
 * direction (down) and from there we grow clockwise towards π*2 radians.
 *
 * @param a - first point.
 * @param b - second.
 * @param unit - The angle unit to use for the output.
 * @returns Standardized angle of the vector from *a* to *b*.
 *
 * @group Geometry
 * @category Angle
 */
export function angleBetweenPoints(
  a: Cartesian,
  b: Cartesian,
  unit: AngleUnit = 'radians',
): number {
  return toAngle(normalizeAngle(Math.atan2(b.y - a.y, b.x - a.x)), 'radians', unit);
}
