import { type Cartesian, type Polygon } from './@types/geometry.ts';

function translatePoint(point: Cartesian, amount: Cartesian): Cartesian {
  return { x: point.x + amount.x, y: point.y + amount.y };
}

/**
 * Translate a point or an array of points by a specified amount.
 *
 * @example
 * ```typescript
 * const point = { x: 1, y: 0 };
 * const translated = translate(point, { x: 1, y: 2 }); // { x: 2, y: 2 }
 * ```
 *
 * @example
 * ```typescript
 * const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
 * const translated = translate(points, { x: 1, y: 2 });
 * // [{ x: 2, y: 2 }, { x: 2, y: 3 }]
 * ```
 *
 * @param point - The point or array of points to translate. Each point should be an object with `x` and `y` properties.
 * @param amount - The amount to move the point(s) by.
 * @returns The translated point or array of translated points.
 *
 * @group Geometry
 * @category Point
 * @category Polygon
 */
export function translate(point: Cartesian, amount: Cartesian): Cartesian;
export function translate(point: Polygon, amount: Cartesian): Polygon;
export function translate(point: Cartesian | Polygon, amount: Cartesian): Cartesian | Polygon {
  if (Array.isArray(point)) {
    return point.map((p) => translatePoint(p, amount));
  }
  return translatePoint(point, amount);
}
