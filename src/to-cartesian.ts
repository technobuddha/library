import { type Cartesian, type Polar } from './@types/geometry.ts';
import { type AngleUnit } from './angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Convert polar coordinates to cartesian
 * @param options - radius, angle in radians (zero points in +X direction).
 * @returns Object containing the X and Y-distance for the angle and radius.
 * @group Geometry
 * @category Coordinates
 */
export function toCartesian({ radius, angle }: Polar, unit: AngleUnit = 'radians'): Cartesian {
  const radians = toAngle(angle, unit, 'radians');

  return { x: radius * Math.cos(radians), y: radius * Math.sin(radians) };
}
