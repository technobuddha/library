import { type Cartesian, type LineSegment } from './@types/geometry.ts';
import { isOnLine } from './is-on-line.ts';

function makeLine(a: [number, number], b: [number, number]): LineSegment {
  return { x0: a[0], y0: a[1], x1: b[0], y1: b[1] };
}

describe('isOnLine', () => {
  test('point at line start', () => {
    const line = makeLine([0, 0], [2, 2]);
    const point: Cartesian = { x: 0, y: 0 };
    expect(isOnLine(point, line)).toBeTrue();
  });

  test('point at line end', () => {
    const line = makeLine([0, 0], [2, 2]);
    const point: Cartesian = { x: 2, y: 2 };
    expect(isOnLine(point, line)).toBeTrue();
  });

  test('point in middle of line', () => {
    const line = makeLine([0, 0], [4, 0]);
    const point: Cartesian = { x: 2, y: 0 };
    expect(isOnLine(point, line)).toBeTrue();
  });

  test('point beyond line end', () => {
    const line = makeLine([0, 0], [2, 2]);
    const point: Cartesian = { x: 4, y: 4 };
    expect(isOnLine(point, line)).toBeFalse();
  });

  test('point off the line', () => {
    const line = makeLine([0, 0], [2, 0]);
    const point: Cartesian = { x: 1, y: 1 };
    expect(isOnLine(point, line)).toBeFalse();
  });
});
