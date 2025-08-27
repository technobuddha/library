import { type Cartesian } from './@types/geometry.ts';
import { type UnitOptions } from './angle.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';
/**
 * Computes the angle between two points (x1,y1) and (x2,y2).
 * Angle zero points in the +X direction, π/2 radians points in the +Y
 * direction (down) and from there we grow clockwise towards π*2 radians.
 *
 * @param a - first point.
 * @param b - second.
 * @param options - see {@link UnitOptions}
 * @returns Standardized angle of the vector from *a* to *b*.
 * @example
 * ```typescript
 * angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 0 }); // 0
 * angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 10 }); // π/4
 * angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 10 }, 'deg'); // 45
 * ```
 * @group Geometry
 * @category Angle
 */
export function angleBetweenPoints(
  a: Cartesian,
  b: Cartesian,
  { unit = 'radians' }: UnitOptions = {},
): number {
  return toAngle(normalizeAngle(Math.atan2(b.y - a.y, b.x - a.x)), 'radians', unit);
}
