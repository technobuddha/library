import { type AngleUnit } from './angle.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Calculates the reflection of an angle across a specified axis.
 *
 * @param angle - The angle to reflect.
 * @param axis - The axis across which to reflect the angle.
 * @param units - The unit of the angles ('radians' by default).
 * @returns The reflected angle, in the specified units.
 *
 * @group Geometry
 * @category Angle
 */
export function angleReflection(angle: number, axis: number, units: AngleUnit = 'radians'): number {
  // Calculate the reflected angle
  const reflectedAngle = 2 * normalizeAngle(axis, units) - normalizeAngle(angle, units);

  return toAngle(normalizeAngle(reflectedAngle), 'radians', units);
}
