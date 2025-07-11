import { type Polygon } from './geometry.ts';
import { isCartesian } from './is-cartesian.ts';

/**
 * Determines if the provided object is a `Polygon`.
 *
 * A `Polygon` is defined as an array where every element satisfies the `isCartesian` predicate.
 *
 * @param object - The value to test for polygon structure.
 * @returns `true` if the object is a `Polygon`, otherwise `false`.
 *
 * @group Geometry
 * @category Polygon
 */
export function isPolygon(object: unknown): object is Polygon {
  return Array.isArray(object) && object.every((o) => isCartesian(o));
}
