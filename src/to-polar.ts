import { type Cartesian, type Polar } from './@types/geometry.ts';
import { normalizeAngle } from './normalize-angle.ts';

/**
 * Convert cartesian coordinates to polar
 *
 * @param options - see {@link Cartesian}
 * @returns polar coordinated
 * @group Geometry
 * @category Coordinates
 */
export function toPolar({ x, y }: Cartesian): Polar {
  return {
    radius: Math.hypot(x, y),
    angle: normalizeAngle(Math.atan2(y, x)),
  };
}
