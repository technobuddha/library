import { type AngleUnit } from './angle.js';
import { units } from './angle.js';

/**
 * Convert an angle from radians to degrees
 *
 * @param angle - Angle
 * @param unit - Unit of the angle (default: radians)
 * @returns angle in degrees
 */
export function toDegrees(angle: number, unit: AngleUnit = 'radians'): number {
  return (units.degrees * angle) / units[unit];
}
