import { area } from '../area.ts';

type Point = { x: number; y: number };

describe('area', () => {
  test('returns 0 for an empty array', () => {
    expect(area([])).toBe(0);
  });

  test('returns 0 for a single point', () => {
    expect(area([{ x: 0, y: 0 }])).toBe(0);
  });

  test('returns 0 for a line (two points)', () => {
    expect(
      area([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ]),
    ).toBe(0);
  });

  test('calculates area of a triangle', () => {
    const triangle: Point[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 3 },
    ];
    expect(area(triangle)).toBe(6);
  });

  test('calculates area of a square', () => {
    const square: Point[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];
    expect(area(square)).toBe(4);
  });

  test('calculates area of a rectangle', () => {
    const rectangle: Point[] = [
      { x: 1, y: 1 },
      { x: 5, y: 1 },
      { x: 5, y: 4 },
      { x: 1, y: 4 },
    ];
    expect(area(rectangle)).toBe(12);
  });

  test('returns signed area when signed=true (counter-clockwise)', () => {
    const triangle: Point[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 3 },
    ];
    expect(area(triangle, true)).toBe(-6);
  });

  test('returns signed area when signed=true (clockwise)', () => {
    const triangle: Point[] = [
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      { x: 4, y: 0 },
    ];
    expect(area(triangle, true)).toBe(6);
  });

  test('returns correct area for a concave polygon', () => {
    const concave: Point[] = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 4 },
      { x: 2, y: 2 },
      { x: 0, y: 4 },
    ];
    expect(area(concave)).toBe(12);
  });

  test('returns correct area for a polygon with negative coordinates', () => {
    const poly: Point[] = [
      { x: -1, y: -1 },
      { x: 2, y: -1 },
      { x: 2, y: 2 },
      { x: -1, y: 2 },
    ];
    expect(area(poly)).toBe(9);
  });

  test('returns 0 for a degenerate polygon (all points colinear)', () => {
    const colinear: Point[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    expect(area(colinear)).toBe(0);
  });
});
