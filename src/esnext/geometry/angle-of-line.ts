import { type UnitOptions } from './angle.ts';
import { type LineSegment } from './geometry.ts';
import { toAngle } from './to-angle.ts';

/**
 * Calculates the angle of a given line segment, relative to the horizontal axis
 * @param line - The line segment for which to calculate the angle.
 * @param options - see {@link UnitOptions}
 * @returns The angle of the line segment in the specified units.
 * @example
 * ```ts
 * angleOfLine({ x0: 0, y0: 0, x1: 10, y1: 10 }); // π/4
 * angleOfLine({ x0: 0, y0: 0, x1: 10, y1: 10 }, 'degrees'); // 45
 * ```
 * @group Geometry
 * @category Angle
 */
export function angleOfLine(line: LineSegment, { unit = 'radians' }: UnitOptions = {}): number {
  return toAngle(Math.atan2(line.y1 - line.y0, line.x1 - line.x0), 'radians', unit);
}
