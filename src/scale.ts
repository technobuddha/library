import { type Cartesian, type Polygon, type XY } from './@types/geometry.ts';
import { type OriginOptions } from './angle.ts';

/**
 * Scales a point relative to a given origin by a specified amount.
 * @param point - The point to be scaled, represented as a Cartesian coordinate.
 * @param amount - The scaling factor. Can be a single number (uniform scaling) or a Cartesian object for non-uniform scaling.
 * @param origin - The origin point about which the scaling is performed.
 * @returns The scaled point as a new Cartesian coordinate.
 * @internal
 */
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
 * Scales a point around a given origin by a specified amount.
 * @param point - The point to rotate.
 * @param amount - The amount to scale the point(s) by. This can be a number (uniform scaling) or a Cartesian object (non-uniform scaling).
 * @param options - see {@link OriginOptions}
 * @returns The rotated point.
 * @example
 * ```typescript
 * scale({ x: 1, y: 0 }, 2); // { x: 2, y: 0 }
 * ```
 */
export function scale(point: Cartesian, amount: number | XY, options?: OriginOptions): Cartesian;
/**
 * Scales a polygon around a given origin by a specified amount.
 * @param polygon - The polygon to rotate
 * @param amount - The amount to scale the point(s) by. This can be a number (uniform scaling) or a Cartesian object (non-uniform scaling).
 * @param options - see {@link OriginOptions}
 * @returns The rotated polygon
 * @example
 * ```typescript
 * scale([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2}], 2);
 * // [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 2, y: 4 }]
 * ```
 */
export function scale(polygon: Polygon, amount: number | XY, options?: OriginOptions): Cartesian[];
/**
 * Scales a point or a polygon of points around a given origin by a specified amount.
 * @group Geometry
 * @category Point
 * @category Polygon
 */
export function scale(
  point: Cartesian | Polygon,
  amount: number | XY,
  { origin = { x: 0, y: 0 } }: OriginOptions = {},
): Cartesian | Polygon {
  if (Array.isArray(point)) {
    return point.map((p) => scalePoint(p, amount, origin));
  }
  return scalePoint(point, amount, origin);
}
