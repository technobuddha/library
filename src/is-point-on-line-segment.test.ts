import { isPointOnLineSegment } from './is-point-on-line-segment.ts';

describe('isPointOnLineSegment', () => {
  const segment = { x0: 0, y0: 0, x1: 4, y1: 4 };

  test('returns true for a point exactly on the segment', () => {
    expect(isPointOnLineSegment({ x: 2, y: 2 }, segment)).toBeTrue();
    expect(isPointOnLineSegment({ x: 0, y: 0 }, segment)).toBeTrue();
    expect(isPointOnLineSegment({ x: 4, y: 4 }, segment)).toBeTrue();
  });

  test('returns false for a point not on the segment but on the line', () => {
    expect(isPointOnLineSegment({ x: 5, y: 5 }, segment)).toBeFalse();
    expect(isPointOnLineSegment({ x: -1, y: -1 }, segment)).toBeFalse();
  });

  test('returns false for a point not collinear with the segment', () => {
    expect(isPointOnLineSegment({ x: 2, y: 3 }, segment)).toBeFalse();
    expect(isPointOnLineSegment({ x: 3, y: 2 }, segment)).toBeFalse();
  });

  test('handles vertical and horizontal segments', () => {
    const vertical = { x0: 1, y0: 1, x1: 1, y1: 5 };
    expect(isPointOnLineSegment({ x: 1, y: 3 }, vertical)).toBeTrue();
    expect(isPointOnLineSegment({ x: 1, y: 6 }, vertical)).toBeFalse();

    const horizontal = { x0: 2, y0: 2, x1: 6, y1: 2 };
    expect(isPointOnLineSegment({ x: 4, y: 2 }, horizontal)).toBeTrue();
    expect(isPointOnLineSegment({ x: 7, y: 2 }, horizontal)).toBeFalse();
  });

  test('handles floating point inaccuracies near the segment', () => {
    const closePoint = { x: 2 + 1e-11, y: 2 - 1e-11 };
    expect(isPointOnLineSegment(closePoint, segment)).toBeTrue();
  });

  test('returns false for a point outside bounding box', () => {
    expect(isPointOnLineSegment({ x: 10, y: 10 }, segment)).toBeFalse();
    expect(isPointOnLineSegment({ x: -10, y: -10 }, segment)).toBeFalse();
  });
});
