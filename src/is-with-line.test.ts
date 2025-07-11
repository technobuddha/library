import { type Cartesian, type LineSegment } from './geometry.ts';
import { isWithLine } from './is-with-line.ts';

// Helper to create a line segment
function makeLine(a: [number, number], b: [number, number]): LineSegment {
  return { x0: a[0], y0: a[1], x1: b[0], y1: b[1] };
}

describe('isWithLine', () => {
  test('point exactly on horizontal line', () => {
    const line = makeLine([0, 0], [2, 0]);
    const point: Cartesian = { x: 1, y: 0 };
    expect(isWithLine(point, line)).toBeTrue();
  });

  test('point exactly on vertical line', () => {
    const line = makeLine([1, 0], [1, 2]);
    const point: Cartesian = { x: 1, y: 1 };
    expect(isWithLine(point, line)).toBeTrue();
  });

  test('point exactly on diagonal line', () => {
    const line = makeLine([0, 0], [2, 2]);
    const point: Cartesian = { x: 1, y: 1 };
    expect(isWithLine(point, line)).toBeTrue();
  });

  test('point at line start', () => {
    const line = makeLine([0, 0], [2, 2]);
    const point: Cartesian = { x: 0, y: 0 };
    expect(isWithLine(point, line)).toBeTrue();
  });

  test('point at line end', () => {
    const line = makeLine([0, 0], [2, 2]);
    const point: Cartesian = { x: 2, y: 2 };
    expect(isWithLine(point, line)).toBeTrue();
  });

  test('point clearly off horizontal line', () => {
    const line = makeLine([0, 0], [2, 0]);
    const point: Cartesian = { x: 1, y: 1 };
    expect(isWithLine(point, line)).toBeFalse();
  });

  test('point clearly off vertical line', () => {
    const line = makeLine([1, 0], [1, 2]);
    const point: Cartesian = { x: 0, y: 1 };
    expect(isWithLine(point, line)).toBeFalse();
  });

  test('point near line within default epsilon', () => {
    const line = makeLine([0, 0], [1, 0]);
    const point: Cartesian = { x: 0.5, y: 1e-11 };
    expect(isWithLine(point, line)).toBeTrue();
  });

  test('point near line outside default epsilon', () => {
    const line = makeLine([0, 0], [1, 0]);
    const point: Cartesian = { x: 0.5, y: 1e-9 };
    expect(isWithLine(point, line)).toBeFalse();
  });

  test('custom epsilon tolerance', () => {
    const line = makeLine([0, 0], [1, 0]);
    const point: Cartesian = { x: 0.5, y: 0.05 };
    expect(isWithLine(point, line, 0.1)).toBeTrue();
    expect(isWithLine(point, line, 0.01)).toBeFalse();
  });
});
