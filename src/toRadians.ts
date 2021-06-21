import { units } from './_angle';
import type { AngleUnit } from './_angle';

/**
 * Converts degrees to radians.
 *
 * @param angle Angle in degrees.
 * @return Angle in radians.
 */
export function toRadians(angle: number, unit: AngleUnit = 'degrees'): number {
    return units.radians * angle / units[unit];
}

export default toRadians;
