import { type Polygon } from './@types/geometry.ts';
import { perimeter } from './perimeter.ts';

describe('perimeter', () => {
  test('returns 0 for a polygon with less than 2 vertices', () => {
    expect(perimeter([])).toBe(0);
    expect(perimeter([{ x: 0, y: 0 }])).toBe(0);
  });

  test('returns correct perimeter for a triangle', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 4 },
    ];
    // Sides: 3, 4, 5 (3-4-5 triangle)
    expect(perimeter(triangle)).toBeCloseTo(12);
  });

  test('returns correct perimeter for a square', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];
    // Sides: 2, 2, 2, 2
    expect(perimeter(square)).toBeCloseTo(8);
  });

  test('returns correct perimeter for a rectangle', () => {
    const rectangle: Polygon = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 0, y: 1 },
    ];
    // Sides: 4, 1, 4, 1
    expect(perimeter(rectangle)).toBeCloseTo(10);
  });

  test('returns correct perimeter for a pentagon', () => {
    const pentagon: Polygon = [
      { x: 0, y: 1 },
      { x: Math.sin((2 * Math.PI) / 5), y: Math.cos((2 * Math.PI) / 5) },
      { x: Math.sin((4 * Math.PI) / 5), y: -Math.cos(Math.PI / 5) },
      { x: -Math.sin((4 * Math.PI) / 5), y: -Math.cos(Math.PI / 5) },
      { x: -Math.sin((2 * Math.PI) / 5), y: Math.cos((2 * Math.PI) / 5) },
    ];
    // Regular pentagon with unit radius
    expect(perimeter(pentagon)).toBeGreaterThan(4.5);
    expect(perimeter(pentagon)).toBeLessThan(6);
  });

  test('returns correct perimeter for colinear points (degenerate polygon)', () => {
    const line: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 4, y: 0 },
    ];
    // Sides: 2, 2, 4 (closing the polygon)
    expect(perimeter(line)).toBeCloseTo(8);
  });
});
