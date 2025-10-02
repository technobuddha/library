import { type Cartesian } from './geometry.ts';

/**
 * Options for calculating Manhattan distance with grid wrapping.
 * All properties are required if the options object is provided.
 * @group Geometry
 * @category Distance
 */
export type ManhattanDistanceOptions = {
  /** The width of the grid. */
  width: number;
  /** The height of the grid. */
  height: number;
  /** Whether to wrap horizontally (left/right edges connect). */
  wrapHorizontal: boolean;
  /** Whether to wrap vertically (top/bottom edges connect). */
  wrapVertical: boolean;
};

/**
 * Calculates the Manhattan distance between two points.
 *
 * The Manhattan distance is based on the number of blocks that one would have
 * to walk in Manhattan to get from one point to another. It is assumed that
 * "Manhattan" is an orthogonal grid where no diagonal movement is allowed.
 *
 * If `wrapHorizontal` or `wrapVertical` are true, the function will consider
 * the shortest path accounting for wrapping around the grid edges.
 *
 * Manhattan distance is often used in grid-based path-finding algorithms.
 * @param a - The first point.
 * @param b - The second point.
 * @param options - (Optional) Grid options for width, height, and wrapping. All values must be supplied if provided.
 * @returns The Manhattan distance between the two points, considering wrapping if specified.
 * @example
 * ```typescript
 * manhattanDistance({ x: 1, y: 2 }, { x: 4, y: 6 }); // 7
 * manhattanDistance({ x: 0, y: 0 }, { x: 4, y: 0 }, { width: 5, height: 5, wrapHorizontal: true, wrapVertical: false }); // 1
 * ```
 * @group Geometry
 * @category Distance
 */
export function manhattanDistance(
  a: Cartesian,
  b: Cartesian,
  options?: ManhattanDistanceOptions,
): number {
  let dx = Math.abs(a.x - b.x);
  let dy = Math.abs(a.y - b.y);

  if (options) {
    if (options.wrapHorizontal) {
      dx = Math.min(dx, options.width - dx);
    }
    if (options.wrapVertical) {
      dy = Math.min(dy, options.height - dy);
    }
  }

  return dx + dy;
}
