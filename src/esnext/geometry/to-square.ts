import { type Rect } from './geometry.ts';

/**
 * Converts a {@link Rect} to the largest possible square that fits within it,
 * centered along the longer dimension. If the rectangle is already a square,
 * it returns the original rectangle.
 * @param rect - The {@link Rect}.
 * @returns A square shaped {@link Rect}.
 * @example
 * ```typescript
 * toSquare({ x: 1, y: 2, width: 6, height: 4 });
 * // { x: 2, y: 2, width: 4, height: 4 }
 *
 * toSquare({ x: 1, y: 2, width: 3, height: 7 });
 * // { x: 1, y: 4, width: 3, height: 3 }
 *
 * toSquare({ x: 0, y: 0, width: 5, height: 5 });
 * // { x: 0, y: 0, width: 5, height: 5 }
 * ```
 * @group Geometry
 * @category Rectangle
 */
export function toSquare(rect: Rect): Rect {
  if (rect.width > rect.height) {
    return {
      x: rect.x + (rect.width - rect.height) / 2,
      y: rect.y,
      width: rect.height,
      height: rect.height,
    };
  } else if (rect.height > rect.width) {
    return {
      x: rect.x,
      y: rect.y + (rect.height - rect.width) / 2,
      width: rect.width,
      height: rect.width,
    };
  }

  return rect;
}
