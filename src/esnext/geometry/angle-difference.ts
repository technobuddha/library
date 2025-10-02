import { type UnitOptions } from './angle.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Computes the difference between startAngle and endAngle.
 * @param startAngle - Start angle.
 * @param endAngle - End angle.
 * @param options - see {@link UnitOptions}
 * @returns The amount that when added to *startAngle* will result in *endAngle*.
 * @remarks
 * Positive numbers mean that the
 * direction is clockwise. Negative numbers indicate a counter-clockwise direction.
 * The shortest route (clockwise vs counter-clockwise) between the angles is used.
 * When the difference is π radians, the function returns π (not -π)
 * @example
 * ```typescript
 * angleDifference(Math.PI * 1/6, Math.PI * 2/6); // π * 1/6
 * angleDifference(Math.PI * 2/6, Math.PI * 1/6); // -π * 1/6.
 * angleDifference(30, 60, 'deg'); // 30
 * ```
 * @group Geometry
 * @category Angle
 */
export function angleDifference(
  startAngle: number,
  endAngle: number,
  { unit = 'radians' }: UnitOptions = {},
): number {
  let d = normalizeAngle(endAngle, { unit }) - normalizeAngle(startAngle, { unit });
  if (d > Math.PI) {
    d -= Math.PI * 2;
  }

  return toAngle(d + 0, 'radians', unit);
}
