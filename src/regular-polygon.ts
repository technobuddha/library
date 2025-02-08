import { type Cartesian, Origin, type Polygon } from './@types/geometry.ts';

/**
 * Generates the vertices of a regular polygon as an array of Cartesian points.
 *
 * @param sides - The number of sides of the polygon (must be at least 3). Defaults to 3.
 * @param radius - The radius of the polygon (distance from the origin to each vertex). Defaults to 1.
 * @param origin - The center point of the polygon as a Cartesian coordinate. Defaults to \{x: 0, y: 0\}.
 * @returns An array of Cartesian points representing the vertices of the regular polygon.
 * @throws `TypeError` If the number of sides is less than 3.
 *
 * @group Geometry
 * @category Polygon
 */
export function regularPolygon(sides = 3, radius = 1, origin: Cartesian = Origin): Polygon {
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
