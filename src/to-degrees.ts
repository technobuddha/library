import { type AngleUnit, angleUnits } from './angle.ts';

/**
 * Convert an angle from radians to degrees
 *
 * @param angle - Angle
 * @param unit - Unit of the angle (default: radians)
 * @returns angle in degrees
 * @group Geometry
 * @category Angle
 */
export function toDegrees(angle: number, unit: AngleUnit = 'radians'): number {
  return (angleUnits.degrees * angle) / angleUnits[unit];
}
