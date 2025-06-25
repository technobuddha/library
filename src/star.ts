import { type Cartesian, type Polygon } from './geometry.ts';

/**
 * Generates the vertices of a star-shaped polygon.
 *
 * @param sides - The number of points (arms) of the star. Must be at least 3.
 * @param outer - The radius from the origin to the outer vertices (tips) of the star.
 * @param inner - The radius from the origin to the inner vertices (indentations) of the star. Defaults to half of `outer`.
 * @param origin - The center point of the star, as a Cartesian coordinate. Defaults to `{ x: 0, y: 0 }`.
 * @returns An array of `Cartesian` points representing the vertices of the star in drawing order.
 * @throws {@link TypeError} If `sides` is less than 3.
 *
 * @group Geometry
 * @category Polygon
 */
export function star(
  sides = 3,
  outer = 1,
  inner = outer * 0.5,
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  origin: Cartesian = { x: 0, y: 0 },
): Polygon {
  if (sides < 3) {
    throw new TypeError('A polygon must have at least 3 sides.');
  }

  const angleIncrement = (2 * Math.PI) / sides;
  const points: Cartesian[] = [];

  for (let i = 0; i < sides; i++) {
    const angle0 = i * angleIncrement;
    const x0 = origin.x + outer * Math.cos(angle0);
    const y0 = origin.y + outer * Math.sin(angle0);
    points.push({ x: x0, y: y0 });

    const angle1 = angle0 + angleIncrement / 2;
    const x1 = origin.x + inner * Math.cos(angle1);
    const y1 = origin.y + inner * Math.sin(angle1);
    points.push({ x: x1, y: y1 });
  }

  return points;
}
