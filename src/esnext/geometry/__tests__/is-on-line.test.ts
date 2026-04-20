import { type LineSegment } from '../geometry.ts';
import { isOnLine, type IsOnLineOptions } from '../is-on-line.ts';

const line: LineSegment = { x0: 0, y0: 0, x1: 4, y1: 4 };

describe('isOnLine', () => {
  test('returns true for a point exactly on the segment', () => {
    expect(isOnLine({ x: 2, y: 2 }, line)).toBeTrue();
    expect(isOnLine({ x: 0, y: 0 }, line)).toBeTrue();
    expect(isOnLine({ x: 4, y: 4 }, line)).toBeTrue();
  });

  test('returns false for a point not on the line', () => {
    expect(isOnLine({ x: 2, y: 3 }, line)).toBeFalse();
    expect(isOnLine({ x: 5, y: 5 }, line)).toBeFalse();
    expect(isOnLine({ x: -1, y: -1 }, line)).toBeFalse();
  });

  test('returns false for a colinear point outside the segment by default', () => {
    expect(isOnLine({ x: 5, y: 5 }, line)).toBeFalse();
    expect(isOnLine({ x: -1, y: -1 }, line)).toBeFalse();
  });

  test('returns true for a colinear point outside the segment when extend=true', () => {
    const options: IsOnLineOptions = { extend: true };
    expect(isOnLine({ x: 5, y: 5 }, line, options)).toBeTrue();
    expect(isOnLine({ x: -1, y: -1 }, line, options)).toBeTrue();
  });

  test('returns true for a point very close to the line within tolerance', () => {
    const options: IsOnLineOptions = { tolerance: 1e-1 };
    expect(isOnLine({ x: 2, y: 2.009 }, line, options)).toBeTrue();
  });

  test('returns false for a point just outside tolerance', () => {
    const options: IsOnLineOptions = { tolerance: 1e-4 };
    expect(isOnLine({ x: 2, y: 2.01 }, line, options)).toBeFalse();
  });

  test('works for vertical and horizontal lines', () => {
    const vertical: LineSegment = { x0: 1, y0: 1, x1: 1, y1: 5 };
    expect(isOnLine({ x: 1, y: 3 }, vertical)).toBeTrue();
    expect(isOnLine({ x: 1, y: 6 }, vertical)).toBeFalse();

    const horizontal: LineSegment = { x0: 2, y0: 3, x1: 6, y1: 3 };
    expect(isOnLine({ x: 4, y: 3 }, horizontal)).toBeTrue();
    expect(isOnLine({ x: 7, y: 3 }, horizontal)).toBeFalse();
  });

  test('returns false for a point with NaN or Infinity', () => {
    expect(isOnLine({ x: NaN, y: 2 }, line)).toBeFalse();
    expect(isOnLine({ x: 2, y: Infinity }, line)).toBeFalse();
  });
});
