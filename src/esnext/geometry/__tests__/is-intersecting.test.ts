import { type LineSegment, type Polygon } from '../geometry.ts';
import { isIntersecting } from '../is-intersecting.ts';

describe('isIntersecting', () => {
  test('line crosses polygon edge', () => {
    const line: LineSegment = { x0: -1, y0: 0.5, x1: 2, y1: 0.5 };
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isIntersecting(line, square)).toBeTrue();
  });

  test('line is completely outside polygon', () => {
    const line: LineSegment = { x0: 2, y0: 2, x1: 3, y1: 3 };
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isIntersecting(line, square)).toBeFalse();
  });

  test('line is completely inside polygon', () => {
    const line: LineSegment = { x0: 0.3, y0: 0.3, x1: 0.7, y1: 0.7 };
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isIntersecting(line, square)).toBeFalse();
  });

  test('line lies along polygon edge', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 1, y1: 0 };
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isIntersecting(line, square)).toBeTrue();
  });

  test('line touches polygon vertex', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 2, y1: 2 };
    const triangle: Polygon = [
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 0, y: 2 },
    ];
    expect(isIntersecting(line, triangle)).toBeTrue();
  });

  test('empty polygon', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 1, y1: 1 };
    const polygon: Polygon = [];
    expect(isIntersecting(line, polygon)).toBeFalse();
  });

  // testing polygon

  test('polygon edge crosses another polygon', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
    ];
    const square: Polygon = [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 3 },
      { x: 1, y: 3 },
    ];
    expect(isIntersecting(triangle, square)).toBeTrue();
  });

  test('polygon completely inside another polygon', () => {
    const smallSquare: Polygon = [
      { x: 1.2, y: 1.2 },
      { x: 1.8, y: 1.2 },
      { x: 1.8, y: 1.8 },
      { x: 1.2, y: 1.8 },
    ];
    const bigSquare: Polygon = [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 3 },
      { x: 1, y: 3 },
    ];
    expect(isIntersecting(smallSquare, bigSquare)).toBeFalse();
  });

  test('polygon shares edge with another polygon', () => {
    const square1: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const square2: Polygon = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ];
    expect(isIntersecting(square1, square2)).toBeTrue();
  });

  test('polygon touches another polygon at a vertex', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    const square: Polygon = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ];
    expect(isIntersecting(triangle, square)).toBeTrue();
  });

  test('polygon completely outside another polygon', () => {
    const square1: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const square2: Polygon = [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
    ];
    expect(isIntersecting(square1, square2)).toBeFalse();
  });

  test('empty polygon as shape', () => {
    const empty: Polygon = [];
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isIntersecting(empty, square)).toBeFalse();
  });

  test('empty polygon as target', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    const empty: Polygon = [];
    expect(isIntersecting(triangle, empty)).toBeFalse();
  });

  test('polygon with two vertices on another polygon boundary', () => {
    const triangle: Polygon = [
      { x: 0, y: 0.5 }, // On square's left edge
      { x: 1, y: 0.5 }, // On square's right edge
      { x: 0.5, y: -1 }, // Outside square
    ];
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isIntersecting(triangle, square)).toBeTrue();
  });
});
