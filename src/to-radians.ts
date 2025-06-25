import { type AngleUnit, angleUnits } from './angle.ts';

/**
 * Converts degrees to radians.
 *
 * @param angle - Angle in degrees.
 * @returns Angle in radians.
 * @group Geometry
 * @category Angle
 */
export function toRadians(angle: number, unit: AngleUnit = 'degrees'): number {
  return (angleUnits.radians * angle) / angleUnits[unit];
}
