import { type Cartesian } from './geometry.ts';

/**
 * Calculates the Manhattan distance between two points in Cartesian coordinates.
 *
 * The Manhattan distance is the sum of the absolute differences of their Cartesian coordinates.
 * It is often used in grid-based pathfinding algorithms.
 *
 * @example
 * ```typescript
 * const pointA = { x: 1, y: 2 };
 * const pointB = { x: 4, y: 6 };
 * const distance = manhattanDistance(pointA, pointB); // 7
 * ```
 *
 * @param a - The first point with `x` and `y` properties.
 * @param b - The second point with `x` and `y` properties.
 * @returns The Manhattan distance between the two points.
 *
 * @group Geometry
 * @category Point
 */
export function manhattanDistance(a: Cartesian, b: Cartesian): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
