import { type UnitOptions } from './angle.ts';
import { type Cartesian, type OriginOptions, type Polygon } from './geometry.ts';
import { normalizeAngle } from './normalize-angle.ts';

/**
 * Rotates a point around a given origin by a specified angle.
 * @param point - The Cartesian coordinates of the point to rotate.
 * @param angle - The angle in radians to rotate the point. Positive values rotate counterclockwise.
 * @param origin - The Cartesian coordinates of the origin around which to rotate.
 * @returns The new Cartesian coordinates of the rotated point.
 * @internal
 */
function rotatePoint(point: Cartesian, angle: number, origin: Cartesian): Cartesian {
  return {
    x: (point.x - origin.x) * Math.cos(angle) - (point.y - origin.y) * Math.sin(angle) + origin.x,
    y: (point.x - origin.x) * Math.sin(angle) + (point.y - origin.y) * Math.cos(angle) + origin.y,
  };
}

/**
 * Rotates a point around a given origin by a specified angle.
 * @param angle - The angle to rotate the point(s) by. Positive values rotate counterclockwise.
 * @param point - The point or array of points to rotate.
 * @param options - see {@link UnitOptions} & {@link OriginOptions}
 * @returns The rotated point.
 * @example
 * ```typescript
 * rotate({ x: 1, y: 0 }, Math.PI / 2); // { x: 0, y: 1 }
 * ```
 */
export function rotate(
  point: Cartesian,
  angle: number,
  options?: UnitOptions & OriginOptions,
): Cartesian;
/**
 * Rotates a polygon around a given origin by a specified angle.
 * @param angle - The angle to rotate the point(s) by. Positive values rotate counterclockwise.
 * @param polygon - The polygon to rotate.
 * @param options - see {@link UnitOptions} & {@link OriginOptions}
 * @returns The rotated polygon.
 * @example
 * ```typescript
 * rotate(
 *   [{ x: 1, y: 0 }, { x: 0, y: 1 }],
 *   Math.PI / 2,
 *   { x: 0, y: 0 }
 * );
 * // [{ x: 0, y: 1 }, { x: -1, y: 0 }]
 * ```
 */
export function rotate(
  polygon: Polygon,
  angle: number,
  options?: UnitOptions & OriginOptions,
): Polygon;
/**
 * Rotates a point or a polygon around a given origin by a specified angle.
 * @group Geometry
 * @category Point
 * @category Polygon
 */ export function rotate(
  point: Cartesian | Polygon,
  angle: number,
  { origin = { x: 0, y: 0 }, unit = 'radians' }: UnitOptions & OriginOptions = {},
): Cartesian | Polygon {
  const angleInRadians = normalizeAngle(angle, { unit });

  if (Array.isArray(point)) {
    return point.map((p) => rotatePoint(p, angleInRadians, origin));
  }
  return rotatePoint(point, angleInRadians, origin);
}
