import { type Cartesian, type Polar } from './@types/geometry.ts';
import { type UnitOptions } from './angle.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Convert cartesian coordinates to polar
 * @param coordinate - The Cartesian coordinate to convert.
 * @param options - see {@link UnitOptions}
 * @returns polar coordinated
 * @group Geometry
 * @category Coordinates
 */
export function toPolar(coordinate: Cartesian, { unit = 'radians' }: UnitOptions = {}): Polar {
  return {
    r: Math.hypot(coordinate.x, coordinate.y),
    φ: toAngle(normalizeAngle(Math.atan2(coordinate.y, coordinate.x)), 'radians', unit),
  };
}
