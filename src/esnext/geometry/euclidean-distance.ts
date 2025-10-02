import { type Cartesian } from './geometry.ts';

/**
 * Calculates the Euclidean distance between two points in 2D Cartesian coordinate space.
 *
 * The Euclidean distance is the straight-line distance between two points \(p_1\) and \(p_2\) in the plane, computed as:
 *
 *     d = sqrt\((x₁ - x₂)^2 + (y₁ - y₂)^2\)
 *
 * @param p1 - The first point (object with `x` and `y` properties).
 * @param p2 - The second point (object with `x` and `y` properties).
 * @returns The Euclidean distance between `p1` and `p2`.
 *
 * @example
 * ```ts
 * import { euclideanDistance } from "@technobuddha/library";
 *
 * const a = { x: 0, y: 0 };
 * const b = { x: 3, y: 4 };
 * euclideanDistance(a, b); // 5
 * ```
 *
 * @group Geometry
 * @category Distance
 */
export function euclideanDistance(p1: Cartesian, p2: Cartesian): number {
  const Δx = p1.x - p2.x;
  const Δy = p1.y - p2.y;
  return Math.hypot(Δx, Δy);
}
