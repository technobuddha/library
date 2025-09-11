import { type Cartesian } from './@types/geometry.ts';

/**
 * Calculates the cross product of vectors OA and OB, where O, A, and B are points in 2D Cartesian space.
 * The result is positive if the sequence OAB makes a counter-clockwise turn,
 * negative for a clockwise turn, and zero if the points are collinear.
 * @see {@link https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located| Calculate on which side of a straight line is a given point located}
 * @param a - The endpoint of the first vector (OA).
 * @param b - The endpoint of the second vector (OB).
 * @param o - The origin point (O) from which both vectors originate.
 * @returns The scalar cross product of vectors OA and OB.
 * @example
 * ```typescript
 * crossProduct({ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }); // 1
 * crossProduct({ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }); // -1
 * crossProduct({ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 0 }); // 0
 * ```
 * @group Math
 * @category Operations
 */
export function crossProduct(a: Cartesian, b: Cartesian, o: Cartesian): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}
