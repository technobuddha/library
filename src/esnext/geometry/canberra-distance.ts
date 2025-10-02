import { type Cartesian } from './geometry.ts';

/**
 * Calculates the Canberra distance between two points in 2D Cartesian space.
 * The Canberra distance is the sum of the ratios of the absolute differences of each coordinate to the sum of their absolute values.
 * @param p1 - The first point (Cartesian).
 * @param p2 - The second point (Cartesian).
 * @returns The Canberra distance between the two points.
 *
 * @example
 * ```ts
 * import { canberraDistance } from '@technobuddha/library';
 *
 * const a = { x: 1, y: 2 };
 * const b = { x: 4, y: 6 };
 * canberraDistance(a, b); // 1.1666666666666665
 * ```
 * @group Geometry
 * @category Distance
 */
export function canberraDistance(p1: Cartesian, p2: Cartesian): number {
  const x = Math.abs(p1.x - p2.x) / (Math.abs(p1.x) + Math.abs(p2.x));
  const y = Math.abs(p1.y - p2.y) / (Math.abs(p1.y) + Math.abs(p2.y));
  return x + y;
}
