import { modulo } from './modulo.js';

/**
 * Normalizes an angle to be in range [0-PI*2]. Angles outside this range will
 * be normalized to be the equivalent angle with that range.
 * @param angle - Angle in radians.
 * @returns Standardized angle.
 */
export function normalizeAngle(angle: number): number {
  return modulo(angle, Math.PI * 2);
}
