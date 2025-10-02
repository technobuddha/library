import { type Cartesian, type Polygon, type XY } from './geometry.ts';

/**
 * Translates a point in Cartesian coordinates by a given amount.
 * @param point - The original point to translate.
 * @param amount - The amount to translate the point by, represented as a Cartesian vector.
 * @returns A new Cartesian point resulting from translating the original point by the specified amount.
 * @internal
 */
function translatePoint(point: Cartesian, amount: Cartesian): Cartesian {
  return { x: point.x + amount.x, y: point.y + amount.y };
}

/**
 * Translate a point by a specified amount.
 * @param point - The point or array of points to translate.
 * @param amount - The amount to move the point by.
 * @returns The translated point.
 * @example
 * ```typescript
 * translate({ x: 1, y: 0 }t, { x: 1, y: 2 }); // { x: 2, y: 2 }
 * ```
 */
export function translate(point: Cartesian, amount: XY): Cartesian;
/**
 * Translate a polygon by a specified amount.
 * @example
 * ```typescript
 * translate([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1}], { x: 1, y: 2 });
 * // [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 1, y: 3 }]
 * ```
 * @param polygon - The polygon to translate.
 * @param amount - The amount to move the polygon by.
 * @returns The translated polygon.
 */
export function translate(polygon: Polygon, amount: Cartesian): Polygon;
/**
 * Translate a point or polygon by a specified amount.
 * @group Geometry
 * @category Transformation
 */
export function translate(point: Cartesian | Polygon, amount: Cartesian): Cartesian | Polygon {
  if (Array.isArray(point)) {
    return point.map((p) => translatePoint(p, amount));
  }
  return translatePoint(point, amount);
}
