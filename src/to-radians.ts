import { type AngleUnit } from './angle.js';
import { units } from './angle.js';

/**
 * Converts degrees to radians.
 *
 * @param angle - Angle in degrees.
 * @returns Angle in radians.
 */
export function toRadians(angle: number, unit: AngleUnit = 'degrees'): number {
  return (units.radians * angle) / units[unit];
}
