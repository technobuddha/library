import { type Cartesian, type Polygon } from './geometry.ts';
import { translate } from './translate.ts';

describe('translate', () => {
  test('translates a single point by a positive amount', () => {
    const point: Cartesian = { x: 1, y: 2 };
    const amount: Cartesian = { x: 3, y: 4 };
    expect(translate(point, amount)).toEqual({ x: 4, y: 6 });
  });

  test('translates a single point by a negative amount', () => {
    const point: Cartesian = { x: 5, y: 7 };
    const amount: Cartesian = { x: -2, y: -3 };
    expect(translate(point, amount)).toEqual({ x: 3, y: 4 });
  });

  test('translates an array of points (polygon)', () => {
    const points: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const amount: Cartesian = { x: 1, y: 2 };
    expect(translate(points, amount)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ]);
  });

  test('translates an empty array', () => {
    const points: Polygon = [];
    const amount: Cartesian = { x: 10, y: 10 };
    expect(translate(points, amount)).toEqual([]);
  });

  test('translates a point by zero amount', () => {
    const point: Cartesian = { x: 3, y: 4 };
    const amount: Cartesian = { x: 0, y: 0 };
    expect(translate(point, amount)).toEqual({ x: 3, y: 4 });
  });

  test('translates a polygon by zero amount', () => {
    const points: Polygon = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const amount: Cartesian = { x: 0, y: 0 };
    expect(translate(points, amount)).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });

  test('handles large numbers', () => {
    const point: Cartesian = { x: 1e6, y: -1e6 };
    const amount: Cartesian = { x: 1e6, y: 1e6 };
    expect(translate(point, amount)).toEqual({ x: 2e6, y: 0 });
  });
});
