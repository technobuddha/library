import { type AngleUnit, angleUnits } from './angle.ts';

/**
 * Converts an angle from one unit to another.
 *
 * @param input - Angle to convert
 * @param from - The input unit of the angle
 * @param to - The output unit of the angle
 * @returns Converted angle.
 * @example
 * ```typescript
 * toAngle(180, 'degrees'); // π
 * toAngle(Math.PI, 'radians', 'degrees'); // 180
 * toAngle(1, 'turns', 'radians'); // 2π
 * ```
 * @group Geometry
 * @category Angle
 */
export function toAngle(input: number, from: AngleUnit, to: AngleUnit = 'radians'): number {
  return (input / angleUnits[from]) * angleUnits[to];
}
