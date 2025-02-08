import { type AngleUnit } from './angle.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Computes the difference between startAngle and endAngle.
 *
 * @param startAngle - Start angle in radians.
 * @param endAngle - End angle in radians.
 * @param unit - The angle unit to use for the output.
 * @returns The number of radians that when added to *startAngle* will result in *endAngle*.
 *
 * @remarks
 * Positive numbers mean that the
 * direction is clockwise. Negative numbers indicate a counter-clockwise direction.
 * The shortest route (clockwise vs counter-clockwise) between the angles is used.
 * When the difference is π radians, the function returns π (not -π)
 *
 * @example
 * angleDifference(π * 1/6,  π * 2/6) is π * 1/6
 *
 * angleDifference(π * 2/6, π * 1/6)  is -π * 1/6.
 *
 * angleDifference(π * 11/6, π * 1/6) is π * 2/6
 *
 * angleDifference(π * 1/6, π * 11/6) is -π * 1/6.
 * @group Geometry
 * @category Angle
 */
export function angleDifference(
  startAngle: number,
  endAngle: number,
  unit: AngleUnit = 'radians',
): number {
  let d = normalizeAngle(endAngle, unit) - normalizeAngle(startAngle, unit);
  if (d > Math.PI) {
    d -= Math.PI * 2;
  }

  return toAngle(d + 0, 'radians', unit);
}
