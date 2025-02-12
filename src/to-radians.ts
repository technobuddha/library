import { type AngleUnit, angleUnits } from './angle-units.js';

/**
 * Converts degrees to radians.
 *
 * @param angle - Angle in degrees.
 * @returns Angle in radians.
 * @group Geometry
 * @category Angle Conversion
 */
export function toRadians(angle: number, unit: AngleUnit = 'degrees'): number {
  return (angleUnits.radians * angle) / angleUnits[unit];
}
