import { type Polar } from './@types/geometry.ts';

/**
 * Determines if the provided value is a Polar point.
 *
 * A value is considered a Polar point if it is a non-null object
 * that contains numeric `φ` and `r` properties.
 *
 * @param point - The value to test for Polar structure.
 * @returns `true` if the value is a Polar point, otherwise `false`.
 * @example
 * ```typescript
 * isPolar({ r: 10, φ: 20 }); // true
 * isPolar({ x: 10, y: 20 }); // false
 * ```
 * @group Geometry
 * @category Coordinates
 */
export function isPolar(point: unknown): point is Polar {
  return (
    point != null &&
    typeof point === 'object' &&
    'φ' in point &&
    'r' in point &&
    typeof (point as Polar).φ === 'number' &&
    typeof (point as Polar).r === 'number'
  );
}
