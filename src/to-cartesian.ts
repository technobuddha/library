import { type AngleUnit } from './angle.ts';
import { type Cartesian, type Polar } from './geometry.ts';
import { toAngle } from './to-angle.ts';

/**
 * Convert polar coordinates to cartesian
 * @param __namedParameters - radius, angle in radians (zero points in +X direction).
 * @returns Object containing the X and Y-distance for the angle and radius.
 * @group Geometry
 * @category Coordinates
 */
export function toCartesian({ radius, angle }: Polar, unit: AngleUnit = 'radians'): Cartesian {
  const aradians = toAngle(angle, unit, 'radians');

  return { x: radius * Math.cos(aradians), y: radius * Math.sin(aradians) };
}
