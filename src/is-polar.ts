import { type Polar } from './@types/geometry.ts';

/**
 * Determines if the provided value is a Polar point.
 *
 * A value is considered a Polar point if it is a non-null object
 * that contains numeric `angle` and `radius` properties.
 *
 * @param point - The value to test for Polar structure.
 * @returns `true` if the value is a Polar point, otherwise `false`.
 *
 * @group Geometry
 * @category Coordinates
 */
export function isPolar(point: unknown): point is Polar {
  return (
    point != null &&
    typeof point === 'object' &&
    'angle' in point &&
    'radius' in point &&
    typeof (point as Polar).angle === 'number' &&
    typeof (point as Polar).radius === 'number'
  );
}
