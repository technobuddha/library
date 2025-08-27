import { type UnitOptions } from './angle.ts';
import { normalizeAngle } from './normalize-angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Calculates the reflection of an angle across a specified axis.
 *
 * @param angle - The angle to reflect.
 * @param axis - The axis across which to reflect the angle.
 * @param options - see {@link UnitOptions}
 * @returns The reflected angle, in the specified units.
 * @example
 * ```typescript
 * angleReflection(0, Math.PI / 2); // π
 * angleReflection((3 * Math.PI) / 2, Math.PI); // π/2
 * angleReflection(60, 30, 'degrees'); // 0
 * ```
 * @group Geometry
 * @category Angle
 */
export function angleReflection(
  angle: number,
  axis: number,
  { unit = 'radians' }: UnitOptions = {},
): number {
  // Calculate the reflected angle
  const reflectedAngle = normalizeAngle(
    2 * normalizeAngle(axis, { unit }) - normalizeAngle(angle, { unit }),
  );

  return toAngle(reflectedAngle, 'radians', unit);
}
