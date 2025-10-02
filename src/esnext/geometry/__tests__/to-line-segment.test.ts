import { type Cartesian } from '../geometry.ts';
import { toLineSegment } from '../to-line-segment.ts';

describe('toLineSegment', () => {
  test('creates line segment from two positive coordinate points', () => {
    const pointA: Cartesian = { x: 1, y: 2 };
    const pointB: Cartesian = { x: 3, y: 4 };

    const result = toLineSegment(pointA, pointB);

    expect(result).toEqual({
      x0: 1,
      y0: 2,
      x1: 3,
      y1: 4,
    });
  });

  test('creates line segment from negative coordinate points', () => {
    const pointA: Cartesian = { x: -5, y: -3 };
    const pointB: Cartesian = { x: -1, y: -7 };

    const result = toLineSegment(pointA, pointB);

    expect(result).toEqual({
      x0: -5,
      y0: -3,
      x1: -1,
      y1: -7,
    });
  });

  test('creates line segment with zero coordinates', () => {
    const pointA: Cartesian = { x: 0, y: 0 };
    const pointB: Cartesian = { x: 5, y: 3 };

    const result = toLineSegment(pointA, pointB);

    expect(result).toEqual({
      x0: 0,
      y0: 0,
      x1: 5,
      y1: 3,
    });
  });

  test('creates line segment with decimal coordinates', () => {
    const pointA: Cartesian = { x: 1.5, y: 2.7 };
    const pointB: Cartesian = { x: 3.2, y: 4.9 };

    const result = toLineSegment(pointA, pointB);

    expect(result).toEqual({
      x0: 1.5,
      y0: 2.7,
      x1: 3.2,
      y1: 4.9,
    });
  });

  test('creates degenerate line segment from identical points', () => {
    const point: Cartesian = { x: 2, y: 3 };

    const result = toLineSegment(point, point);

    expect(result).toEqual({
      x0: 2,
      y0: 3,
      x1: 2,
      y1: 3,
    });
  });

  test('creates line segment from points in different quadrants', () => {
    const pointA: Cartesian = { x: -2, y: 3 };
    const pointB: Cartesian = { x: 4, y: -1 };

    const result = toLineSegment(pointA, pointB);

    expect(result).toEqual({
      x0: -2,
      y0: 3,
      x1: 4,
      y1: -1,
    });
  });

  test('creates line segment with large coordinate values', () => {
    const pointA: Cartesian = { x: 1000000, y: -999999 };
    const pointB: Cartesian = { x: -500000, y: 750000 };

    const result = toLineSegment(pointA, pointB);

    expect(result).toEqual({
      x0: 1000000,
      y0: -999999,
      x1: -500000,
      y1: 750000,
    });
  });

  test('does not mutate input points', () => {
    const pointA: Cartesian = { x: 1, y: 2 };
    const pointB: Cartesian = { x: 3, y: 4 };
    const originalA = { ...pointA };
    const originalB = { ...pointB };

    toLineSegment(pointA, pointB);

    expect(pointA).toEqual(originalA);
    expect(pointB).toEqual(originalB);
  });

  test('maps pointA to start coordinates (x0, y0)', () => {
    const pointA: Cartesian = { x: 10, y: 20 };
    const pointB: Cartesian = { x: 30, y: 40 };

    const result = toLineSegment(pointA, pointB);

    expect(result.x0).toBe(pointA.x);
    expect(result.y0).toBe(pointA.y);
  });

  test('maps pointB to end coordinates (x1, y1)', () => {
    const pointA: Cartesian = { x: 10, y: 20 };
    const pointB: Cartesian = { x: 30, y: 40 };

    const result = toLineSegment(pointA, pointB);

    expect(result.x1).toBe(pointB.x);
    expect(result.y1).toBe(pointB.y);
  });
});
