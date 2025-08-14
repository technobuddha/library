import { type Polygon } from './@types/geometry.ts';
import { bounds } from './bounds.ts';

describe('bounds', () => {
  test('calculates bounds for a simple triangle', () => {
    const triangle: Polygon = [
      { x: 1, y: 2 },
      { x: 4, y: 6 },
      { x: -2, y: 3 },
    ];
    const result = bounds(triangle);
    expect(result).toEqual({ x: -2, y: 2, width: 6, height: 4 });
  });

  test('calculates bounds for a rectangle-shaped polygon', () => {
    const rectangle: Polygon = [
      { x: 0, y: 0 },
      { x: 0, y: 5 },
      { x: 10, y: 5 },
      { x: 10, y: 0 },
    ];
    const result = bounds(rectangle);
    expect(result).toEqual({ x: 0, y: 0, width: 10, height: 5 });
  });

  test('calculates bounds for a polygon with negative coordinates', () => {
    const poly: Polygon = [
      { x: -5, y: -5 },
      { x: -1, y: -10 },
      { x: -3, y: -2 },
    ];
    const result = bounds(poly);
    expect(result).toEqual({ x: -5, y: -10, width: 4, height: 8 });
  });

  test('calculates bounds for a polygon with all vertices at the same point', () => {
    const poly: Polygon = [
      { x: 2, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 2 },
    ];
    const result = bounds(poly);
    expect(result).toEqual({ x: 2, y: 2, width: 0, height: 0 });
  });

  test('throws TypeError if less than 3 vertices are provided', () => {
    expect(() => bounds([] as Polygon)).toThrow(TypeError);
    expect(() => bounds([{ x: 1, y: 2 }] as Polygon)).toThrow(TypeError);
    expect(() =>
      bounds([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ] as Polygon),
    ).toThrow(TypeError);
  });

  test('calculates bounds for a polygon with floating point coordinates', () => {
    const poly: Polygon = [
      { x: 1.1, y: 2.2 },
      { x: 3.3, y: 4.4 },
      { x: -1.5, y: 0.5 },
    ];
    const result = bounds(poly);
    expect(result).toBeDeepCloseTo({ x: -1.5, y: 0.5, width: 4.8, height: 3.9 });
  });
});
