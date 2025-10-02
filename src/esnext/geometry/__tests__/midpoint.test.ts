import { type LineSegment } from '../geometry.ts';
import { midpoint } from '../midpoint.ts';

describe('midpoint', () => {
  test('returns the midpoint for part=0.5 (default)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 2, y1: 2 };
    expect(midpoint(line)).toEqual({ x: 1, y: 1 });
  });

  test('returns the start point for part=0', () => {
    const line: LineSegment = { x0: 1, y0: 2, x1: 3, y1: 4 };
    expect(midpoint(line, 0)).toEqual({ x: 1, y: 2 });
  });

  test('returns the end point for part=1', () => {
    const line: LineSegment = { x0: 1, y0: 2, x1: 3, y1: 4 };
    expect(midpoint(line, 1)).toEqual({ x: 3, y: 4 });
  });

  test('returns the correct point for part=0.25', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 4, y1: 4 };
    expect(midpoint(line, 0.25)).toEqual({ x: 1, y: 1 });
  });

  test('handles negative coordinates', () => {
    const line: LineSegment = { x0: -2, y0: -2, x1: 2, y1: 2 };
    expect(midpoint(line)).toEqual({ x: 0, y: 0 });
  });

  test('handles vertical lines', () => {
    const line: LineSegment = { x0: 3, y0: 1, x1: 3, y1: 5 };
    expect(midpoint(line)).toEqual({ x: 3, y: 3 });
  });

  test('handles horizontal lines', () => {
    const line: LineSegment = { x0: 1, y0: 4, x1: 5, y1: 4 };
    expect(midpoint(line)).toEqual({ x: 3, y: 4 });
  });

  test('handles part less than 0', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 2, y1: 2 };
    expect(midpoint(line, -0.5)).toEqual({ x: -1, y: -1 });
  });

  test('handles part greater than 1', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 2, y1: 2 };
    expect(midpoint(line, 1.5)).toEqual({ x: 3, y: 3 });
  });
});
