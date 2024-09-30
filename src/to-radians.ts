import { type AngleUnit } from './angle-units';
import { angleUnits } from './angle-units';

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
