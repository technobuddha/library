import { type Cartesian } from './geometry.ts';

/**
 * Calculates the Chebyshev distance (maximum metric) between two points in 2D Cartesian space.
 * The Chebyshev distance is the greatest of the absolute differences of their coordinates.
 * @param p1 - The first point (Cartesian).
 * @param p2 - The second point (Cartesian).
 * @returns The Chebyshev distance between the two points.
 *
 * @example
 * ```ts
 * import { chebyshevDistance } from '@technobuddha/library';
 *
 * const a = { x: 1, y: 2 };
 * const b = { x: 4, y: 6 };
 * chebyshevDistance(a, b); // 4
 * ```
 * @group Geometry
 * @category Distance
 */
export function chebyshevDistance(p1: Cartesian, p2: Cartesian): number {
  return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
}
