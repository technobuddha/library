import { units } from './_angle';
import type { AngleUnit } from './_angle';

/**
 * Convert an angle from radians to degrees
 *
 * @param radians Angle in radians
 * @returns angle in degrees
 */
export function toDegrees(angle: number, unit: AngleUnit = 'radians'): number {
    return units.degrees * angle / units[unit];
}

export default toDegrees;
