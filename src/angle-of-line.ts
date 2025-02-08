import { type LineSegment } from './@types/geometry.ts';
import { type AngleUnit } from './angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Calculates the angle of a given line segment, relative to the horizontal axis
 *
 * @param line - The line segment for which to calculate the angle.
 * @param units - The unit of the returned angle ('radians' by default).
 * @returns The angle of the line segment in the specified units.
 *
 * @group Geometry
 * @category Line Segment
 * @category Angle
 */
export function angleOfLine(line: LineSegment, units: AngleUnit = 'radians'): number {
  return toAngle(Math.atan2(line.y1 - line.y0, line.x1 - line.x0), 'radians', units);
}
