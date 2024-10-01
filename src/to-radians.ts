import { type AngleUnit } from './angle-units.js';
import { angleUnits } from './angle-units.js';

/**
 * Converts degrees to radians.
 *
 * @param angle Angle in degrees.
 * @return Angle in radians.
 */
export function toRadians(angle: number, unit: AngleUnit = 'degrees'): number {
  return (angleUnits.radians * angle) / angleUnits[unit];
}

export default toRadians;
