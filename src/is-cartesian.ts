import { type Cartesian } from './@types/geometry.ts';

/**
 * Determines if the provided value is a Cartesian point.
 *
 * A value is considered a Cartesian point if it is a non-null object
 * that contains numeric `x` and `y` properties.
 *
 * @param point - The value to test for Cartesian structure.
 * @returns `true` if the value is a Cartesian point, otherwise `false`.
 *
 * @group Geometry
 * @category Coordinates
 */
export function isCartesian(point: unknown): point is Cartesian {
  return (
    point != null &&
    typeof point === 'object' &&
    'x' in point &&
    'y' in point &&
    typeof (point as Cartesian).x === 'number' &&
    typeof (point as Cartesian).y === 'number'
  );
}
