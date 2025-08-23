import { type AngleUnit, angleUnits } from './angle.ts';

/**
 * Converts an angle from one unit to another.
 *
 * @param input - Angle to convert
 * @param from - The input unit of the angle
 * @param to - The output unit of the angle (default is 'radians')
 * @returns Converted angle.
 *
 * @group Geometry
 * @category Angle
 */
export function toAngle(input: number, from: AngleUnit, to: AngleUnit = 'radians'): number {
  return (input / angleUnits[from]) * angleUnits[to];
}
