import { type Cartesian, Origin, type Polygon } from './@types/geometry.ts';
import { type OriginOptions } from './angle.ts';

/**
 * Generates a regular polygon.
 * @param sides - The number of sides of the polygon (must be at least 3).
 * @param radius - The radius of the polygon (distance from the origin to each vertex).
 * @param options - see {@link OriginOptions}
 * @returns A regular polygon.
 * @throws `TypeError` If the number of sides is less than 3.
 * @example
 * ```typescript
 * regularPolygon(4, 2);
 * // [
 * //   { x: 2, y: 0 },
 * //   { x: 0, y: 2 },
 * //   { x: -2, y: 0 },
 * //   { x: 0, y: -2 }
 * // ]
 * ```
 * @group Geometry
 * @category Polygon
 */
export function regularPolygon(
  sides = 3,
  radius = 1,
  { origin = Origin }: OriginOptions = {},
): Polygon {
  if (sides < 3) {
    throw new TypeError('A polygon must have at least 3 sides.');
  }

  const angleIncrement = (2 * Math.PI) / sides;
  const points: Cartesian[] = [];

  for (let i = 0; i < sides; i++) {
    const angle = i * angleIncrement;
    const x = origin.x + radius * Math.cos(angle);
    const y = origin.y + radius * Math.sin(angle);
    points.push({ x, y });
  }

  return points;
}
