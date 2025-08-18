import { type Cartesian, Origin, type Polygon } from './@types/geometry.ts';

function rotatePoint(point: Cartesian, angle: number, origin: Cartesian): Cartesian {
  return {
    x: (point.x - origin.x) * Math.cos(angle) - (point.y - origin.y) * Math.sin(angle) + origin.x,
    y: (point.x - origin.x) * Math.sin(angle) + (point.y - origin.y) * Math.cos(angle) + origin.y,
  };
}

/**
 * Rotates a point or an array of points around a given origin by a specified angle.
 *
 * @example
 * ```ts
 * const point = { x: 1, y: 0 };
 * const rotated = rotate(point, Math.PI / 2); // { x: 0, y: 1 }
 * ```
 *
 * @example
 * ```ts
 * const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
 * const rotated = rotate(points, Math.PI / 2, { x: 0, y: 0 });
 * // [{ x: 0, y: 1 }, { x: -1, y: 0 }]
 * ```
 *
 * @param point - The point or array of points to rotate. Each point should be an object with `x` and `y` properties.
 * @param angle - The angle in radians to rotate the point(s) by. Positive values rotate counterclockwise.
 * @param origin - (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided.
 * @returns The rotated point or array of rotated points.
 *
 * @group Geometry
 * @category Point
 * @category Polygon
 */
export function rotate(point: Cartesian, angle: number, origin?: Cartesian): Cartesian;
export function rotate(point: Polygon, angle: number, origin?: Cartesian): Polygon;
export function rotate(
  point: Cartesian | Polygon,
  angle: number,
  origin = Origin,
): Cartesian | Polygon {
  if (Array.isArray(point)) {
    return point.map((p) => rotatePoint(p, angle, origin));
  }
  return rotatePoint(point, angle, origin);
}
