import { modulo } from '../math/modulo.ts';

import { type UnitOptions } from './angle.ts';
import { toAngle } from './to-angle.ts';

/**
 * Normalizes an angle to be in range 0-1 turns.
 *
 * Angles outside this range will be normalized to be the equivalent angle with that range.
 * Angles are always returned as radians.
 * @param angle - Angle
 * @param options - see {@link UnitOptions}
 * @returns Standardized angle in radians.
 * @example
 * ```typescript
 * normalizeAngle(Math.PI); // π
 * normalizeAngle(2 * Math.PI); // 0
 * normalizeAngle(180, 'degrees'); // π
 * normalizeAngle(540, 'degrees'); // π
 * ```
 * @group Geometry
 * @category Angle
 */
export function normalizeAngle(angle: number, { unit = 'radians' }: UnitOptions = {}): number {
  return modulo(toAngle(angle, unit, 'radians'), Math.PI * 2) + 0;
}
