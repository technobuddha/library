import { angleUnits, type UnitOptions } from './angle.ts';

/**
 * Converts degrees to radians.
 *
 * @param angle - Angle.
 * @param options - see {@link UnitOptions}
 * @returns Angle in radians.
 * @example
 * ```typescript
 * toRadians(180); // π
 * toRadians(90, 'degrees'); // π/2
 * toRadians(0.5, 'turns'); // π
 * ```
 * @group Geometry
 * @category Angle
 */
export function toRadians(angle: number, { unit = 'degrees' }: UnitOptions = {}): number {
  return (angleUnits.radians * angle) / angleUnits[unit];
}
