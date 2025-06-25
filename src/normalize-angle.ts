import { type AngleUnit } from './angle.ts';
import { modulo } from './modulo.ts';
import { toAngle } from './to-angle.ts';

/**
 * Normalizes an angle to be in range [0-π*2]. Angles outside this range will
 * be normalized to be the equivalent angle with that range.
 * @param angle - Angle in radians.
 * @returns Standardized angle.
 * @group Geometry
 * @category Angle
 */
export function normalizeAngle(angle: number, unit: AngleUnit = 'radians'): number {
  return modulo(toAngle(angle, unit, 'radians'), Math.PI * 2) + 0;
}
