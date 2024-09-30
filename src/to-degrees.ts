import { type AngleUnit } from './angle-units';
import { angleUnits } from './angle-units';

/**
 * Convert an angle from radians to degrees
 *
 * @param radians Angle in radians
 * @returns angle in degrees
 */
export function toDegrees(angle: number, unit: AngleUnit = 'radians'): number {
  return (angleUnits.degrees * angle) / angleUnits[unit];
}

export default toDegrees;
