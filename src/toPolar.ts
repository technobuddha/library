import { normalizeAngle } from './normalizeAngle';
import type { Cartesian, Polar } from './coordinates';

/**
 * Convert ccartesian coordinates to polar
 *
 * @param __namedParameters see {@link Cartesian}
 * @returns polar coordinated
 */
export function toPolar({ x, y }: Cartesian): Polar {
    return { radius: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), angle: normalizeAngle(Math.atan2(y, x)) };
}

export default toPolar;
