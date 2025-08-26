import { type Cartesian, type Polygon } from './@types/geometry.ts';

function scalePoint(point: Cartesian, amount: number | Cartesian, origin: Cartesian): Cartesian {
  const { x, y } = point;
  const { x: scaleX, y: scaleY } = typeof amount === 'number' ? { x: amount, y: amount } : amount;
  const { x: originX, y: originY } = origin;

  return {
    x: originX + (x - originX) * scaleX,
    y: originY + (y - originY) * scaleY,
  };
}

/**
 * Scales a point or a polygon of points around a given origin by a specified amount.
 *
 * @example
 * ```typescript
 * const point = { x: 1, y: 0 };
 * const rotated = scale(point, 2); // { x: 2, y: 0 }
 * ```
 *
 * @example
 * ```typescript
 * const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
 * const rotated = scale(points, 2);
 * // [{ x: 2, y: 0 }, { x: 0, y: 2 }]
 * ```
 *
 * @param point - The point or array of points to rotate. Each point should be an object with `x` and `y` properties.
 * @param amount - The amount to scale the point(s) by. This can be a number (uniform scaling) or a Cartesian object (non-uniform scaling).
 * @param origin - (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided.
 * @returns The rotated point or array of rotated points.
 *
 * @group Geometry
 * @category Point
 * @category Polygon
 */
export function scale(point: Cartesian, amount: number | Cartesian, origin?: Cartesian): Cartesian;
export function scale(point: Polygon, angle: number | Cartesian, origin?: Cartesian): Cartesian[];
export function scale(
  point: Cartesian | Polygon,
  angle: number | Cartesian,
  { x = 0, y = 0 } = {},
): Cartesian | Polygon {
  if (Array.isArray(point)) {
    return point.map((p) => scalePoint(p, angle, { x, y }));
  }
  return scalePoint(point, angle, { x, y });
}
