import { type Rect } from './geometry.ts';
import { toSquare } from './to-square.ts';

describe('toSquare', () => {
  test('returns the same rect if already a square', () => {
    const rect: Rect = { x: 0, y: 0, width: 10, height: 10 };
    expect(toSquare(rect)).toEqual(rect);
  });

  test('centers square horizontally when width > height', () => {
    const rect: Rect = { x: 0, y: 0, width: 20, height: 10 };
    const result = toSquare(rect);
    expect(result).toEqual({
      x: 5,
      y: 0,
      width: 10,
      height: 10,
    });
  });

  test('centers square vertically when height > width', () => {
    const rect: Rect = { x: 0, y: 0, width: 10, height: 20 };
    const result = toSquare(rect);
    expect(result).toEqual({
      x: 0,
      y: 5,
      width: 10,
      height: 10,
    });
  });

  test('works with non-zero origin', () => {
    const rect: Rect = { x: 10, y: 20, width: 30, height: 10 };
    const result = toSquare(rect);
    expect(result).toEqual({
      x: 20,
      y: 20,
      width: 10,
      height: 10,
    });
  });

  test('works with negative coordinates', () => {
    const rect: Rect = { x: -10, y: -20, width: 10, height: 30 };
    const result = toSquare(rect);
    expect(result).toEqual({
      x: -10,
      y: -10,
      width: 10,
      height: 10,
    });
  });

  test('returns rect with zero size if width and height are zero', () => {
    const rect: Rect = { x: 0, y: 0, width: 0, height: 0 };
    expect(toSquare(rect)).toEqual(rect);
  });

  test('returns rect with zero size if width or height is zero', () => {
    const rect1: Rect = { x: 0, y: 0, width: 0, height: 10 };
    const rect2: Rect = { x: 0, y: 0, width: 10, height: 0 };
    expect(toSquare(rect1)).toEqual({
      x: 0,
      y: 5,
      width: 0,
      height: 0,
    });
    expect(toSquare(rect2)).toEqual({
      x: 5,
      y: 0,
      width: 0,
      height: 0,
    });
  });

  test('handles floating point values', () => {
    const rect: Rect = { x: 1.5, y: 2.5, width: 5.5, height: 3.5 };
    const result = toSquare(rect);
    expect(result).toEqual({
      x: 1.5 + (5.5 - 3.5) / 2,
      y: 2.5,
      width: 3.5,
      height: 3.5,
    });
  });
});
