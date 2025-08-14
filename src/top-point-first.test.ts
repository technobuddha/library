import { type LineSegment } from './@types/geometry.ts';
import { topPointFirst } from './top-point-first.ts';

describe('topPointFirst', () => {
  test('returns the same line if y1 > y0', () => {
    const line: LineSegment = { x0: 1, y0: 2, x1: 3, y1: 5 };
    const result = topPointFirst(line);
    expect(result).toEqual(line);
  });

  test('swaps points if y0 > y1', () => {
    const line: LineSegment = { x0: 3, y0: 5, x1: 1, y1: 2 };
    const result = topPointFirst(line);
    expect(result).toEqual({ x0: 1, y0: 2, x1: 3, y1: 5 });
  });

  test('swaps to leftmost point first when y0 === y1', () => {
    const line: LineSegment = { x0: 5, y0: 4, x1: 0, y1: 4 };
    const result = topPointFirst(line);
    expect(result).toEqual({ x0: 0, y0: 4, x1: 5, y1: 4 });
  });

  test('swaps points if y0 < y1', () => {
    const line: LineSegment = { x0: 2, y0: 1, x1: 4, y1: 3 };
    const result = topPointFirst(line);
    expect(result).toEqual(line);
  });

  test('handles negative coordinates', () => {
    const line: LineSegment = { x0: -1, y0: -2, x1: -3, y1: -1 };
    const result = topPointFirst(line);
    expect(result).toEqual(line);
  });

  test('swaps points with negative y if needed', () => {
    const line: LineSegment = { x0: -3, y0: -1, x1: -1, y1: -2 };
    const result = topPointFirst(line);
    expect(result).toEqual({ x0: -1, y0: -2, x1: -3, y1: -1 });
  });

  test('works with zero coordinates', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 1, y1: 1 };
    const result = topPointFirst(line);
    expect(result).toEqual(line);
  });

  test('swaps when y0 is positive and y1 is negative', () => {
    const line: LineSegment = { x0: 5, y0: 10, x1: 2, y1: -3 };
    const result = topPointFirst(line);
    expect(result).toEqual({ x0: 2, y0: -3, x1: 5, y1: 10 });
  });
});
