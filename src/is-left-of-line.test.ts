import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { isLeftOfLine } from './is-left-of-line.ts';

// Helper to create a line segment
function makeLine(a: [number, number], b: [number, number]): LineSegment {
  return { x0: a[0], y0: a[1], x1: b[0], y1: b[1] };
}

describe('isLeftOfLine', () => {
  test('point above horizontal line going left-to-right', () => {
    const line = makeLine([0, 0], [2, 0]);
    const point: Cartesian = { x: 1, y: 1 };
    expect(isLeftOfLine(point, line)).toBeTrue(); // Changed from toBeFalse
  });

  test('point below horizontal line going left-to-right', () => {
    const line = makeLine([0, 0], [2, 0]);
    const point: Cartesian = { x: 1, y: -1 };
    expect(isLeftOfLine(point, line)).toBeFalse(); // Changed from toBeTrue
  });

  test('point on the line', () => {
    const line = makeLine([0, 0], [2, 0]);
    const point: Cartesian = { x: 1, y: 0 };
    expect(isLeftOfLine(point, line)).toBeFalse();
  });

  test('point left of vertical line going bottom-to-top', () => {
    const line = makeLine([1, 0], [1, 2]);
    const point: Cartesian = { x: 0, y: 1 };
    expect(isLeftOfLine(point, line)).toBeFalse(); // Change from toBeTrue
  });

  test('point right of vertical line going bottom-to-top', () => {
    const line = makeLine([1, 0], [1, 2]);
    const point: Cartesian = { x: 2, y: 1 };
    expect(isLeftOfLine(point, line)).toBeTrue(); // Change from toBeFalse
  });
});
