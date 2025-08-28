import { type Rect } from './@types/geometry.ts';

/**
 * Determines if the provided value is a {@link Rect}e.
 *
 * A value is considered a {@link Rect} if it is a non-null object
 * that contains numeric `x`, `y`, 'width', and 'height' properties.
 * @param object - The value to test for Rectangle structure.
 * @returns `true` if the value is a Rectangle, otherwise `false`.
 * @example
 * ```typescript
 * isRect({ x: 1, y: 2, width: 3, height: 4 }); // true
 * isRect({ x: 1, y: 2, width: 3 }); // false
 * isRect(null); // false
 * isRect([1, 2, 3, 4]); // false
 * ```
 * @group Geometry
 * @category Rectangle
 */
export function isRect(object: unknown): object is Rect {
  return (
    object != null &&
    typeof object === 'object' &&
    'x' in object &&
    'y' in object &&
    'width' in object &&
    'height' in object &&
    typeof (object as Rect).x === 'number' &&
    typeof (object as Rect).y === 'number' &&
    typeof (object as Rect).width === 'number' &&
    typeof (object as Rect).height === 'number'
  );
}
