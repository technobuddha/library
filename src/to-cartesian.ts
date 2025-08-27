import { type Cartesian, type Polar } from './@types/geometry.ts';
import { type UnitOptions } from './angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Convert polar coordinates to cartesian
 * @param point - radius, angle in radians (zero points in +X direction).
 * @param options - see {@link UnitOptions}
 * @returns Object containing the X and Y-distance for the angle and radius.
 * @example
 * ```typescript
 * toCartesian({ r: 1, φ: Math.PI / 4 }); // { x: √2/2, y: √2/2 }
 * toCartesian({ r: 1, φ: 90 }, 'degrees'); // { x: 0, y: 1 }
 * ```
 * @group Geometry
 * @category Coordinates
 */
export function toCartesian(point: Polar, { unit = 'radians' }: UnitOptions = {}): Cartesian {
  const angle = toAngle(point.φ, unit, 'radians');

  return { x: point.r * Math.cos(angle), y: point.r * Math.sin(angle) };
}
