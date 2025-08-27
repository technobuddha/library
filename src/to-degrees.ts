import { type UnitOptions, angleUnits } from './angle.ts';

/**
 * Convert an angle from radians to degrees
 *
 * @param angle - Angle
 * @param options - see {@link UnitOptions}
 * @returns angle in degrees
 * @example
 * ```typescript
 * toDegrees(Math.PI); // 180
 * toDegrees(1, 'turns'); // 360
 * ```
 * @group Geometry
 * @category Angle
 */
export function toDegrees(angle: number, { unit = 'radians' }: UnitOptions = {}): number {
  return (angleUnits.degrees * angle) / angleUnits[unit];
}
