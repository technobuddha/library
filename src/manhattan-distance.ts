import { type Cartesian } from './@types/geometry.ts';

/**
 * Calculates the Manhattan Distance between two points in Cartesian coordinates.
 *
 * The Manhattan Distance is based on the number of blocks that one would have
 * to walk in Manhattan to get from one point to another.   It is assumed that
 * "Manhattan" is an orthogonal grid where no diagonal movement is allowed.
 *
 * Manhattan distance is often used in grid-based path-finding algorithms.
 * @param a - The first point.
 * @param b - The second point.
 * @returns The Manhattan distance between the two points.
 * @example
 * ```typescript
 * manhattanDistance({ x: 1, y: 2 }, { x: 4, y: 6 }); // 7
 * ```
 * @group Geometry
 * @category Point
 */
export function manhattanDistance(a: Cartesian, b: Cartesian): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
