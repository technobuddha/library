import { type Cartesian } from '../geometry.ts';
import { regularPolygon } from '../regular-polygon.ts';

describe('regularPolygon', () => {
  test('returns a triangle by default', () => {
    const result = regularPolygon();
    expect(result).toBeDeepCloseTo([
      { x: 1, y: 0 },
      { x: -0.5, y: Math.sin((2 * Math.PI) / 3) },
      { x: -0.5, y: -Math.sin((2 * Math.PI) / 3) },
    ]);
  });

  test('returns a square with radius 1 at origin', () => {
    const result = regularPolygon(4, 1);
    expect(result).toBeDeepCloseTo([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ]);
  });

  test('returns a pentagon with custom radius and origin', () => {
    const origin: Cartesian = { x: 2, y: 3 };
    const radius = 2;
    const result = regularPolygon(5, radius, { origin });
    expect(result).toBeDeepCloseTo([
      { x: 2 + radius * Math.cos(0), y: 3 + radius * Math.sin(0) },
      { x: 2 + radius * Math.cos((2 * Math.PI) / 5), y: 3 + radius * Math.sin((2 * Math.PI) / 5) },
      { x: 2 + radius * Math.cos((4 * Math.PI) / 5), y: 3 + radius * Math.sin((4 * Math.PI) / 5) },
      { x: 2 + radius * Math.cos((6 * Math.PI) / 5), y: 3 + radius * Math.sin((6 * Math.PI) / 5) },
      { x: 2 + radius * Math.cos((8 * Math.PI) / 5), y: 3 + radius * Math.sin((8 * Math.PI) / 5) },
    ]);
  });

  test('throws if sides < 3', () => {
    expect(() => regularPolygon(2)).toThrow(TypeError);
    expect(() => regularPolygon(0)).toThrow(TypeError);
    expect(() => regularPolygon(-5)).toThrow(TypeError);
  });

  test('returns correct points for hexagon', () => {
    const result = regularPolygon(6, 1, { origin: { x: 0, y: 0 } });
    expect(result).toHaveLength(6);
    expect(result[0]).toEqual({ x: 1, y: 0 });
    expect(result[3].x).toBeCloseTo(-1);
    expect(result[3].y).toBeCloseTo(0);
  });
});
