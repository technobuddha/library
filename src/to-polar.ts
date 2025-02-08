import { type Cartesian, type Polar } from './coordinates.js';
import { normalizeAngle } from './normalize-angle.js';

/**
 * Convert cartesian coordinates to polar
 *
 * @param __namedParameters - see {@link Cartesian}
 * @returns polar coordinated
 */
export function toPolar({ x, y }: Cartesian): Polar {
  return {
    radius: Math.hypot(x, y),
    angle: normalizeAngle(Math.atan2(y, x)),
  };
}
