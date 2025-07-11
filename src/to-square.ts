import { type Rect } from './geometry.ts';

/**
 * Converts a given rectangle to the largest possible square that fits within it,
 * centered along the longer dimension. If the rectangle is already a square,
 * it returns the original rectangle.
 *
 * @param rect - The rectangle to convert, with properties `x`, `y`, `width`, and `height`.
 * @returns A new `Rect` object representing the largest centered square within the original rectangle.
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
