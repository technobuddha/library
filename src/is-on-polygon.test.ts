import { type Cartesian, type Polygon } from './@types/geometry.ts';
import { isOnPolygon } from './is-on-polygon.ts';

describe('isOnPolygon', () => {
  const square: Polygon = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 0, y: 2 },
  ];

  test('point on horizontal edge', () => {
    const point: Cartesian = { x: 1, y: 0 };
    expect(isOnPolygon(point, square)).toBeTrue();
  });

  test('point on vertical edge', () => {
    const point: Cartesian = { x: 2, y: 1 };
    expect(isOnPolygon(point, square)).toBeTrue();
  });

  test('point on vertex', () => {
    const point: Cartesian = { x: 0, y: 0 };
    expect(isOnPolygon(point, square)).toBeTrue();
  });

  test('point inside polygon', () => {
    const point: Cartesian = { x: 1, y: 1 };
    expect(isOnPolygon(point, square)).toBeFalse();
  });

  test('point outside polygon', () => {
    const point: Cartesian = { x: 3, y: 3 };
    expect(isOnPolygon(point, square)).toBeFalse();
  });

  test('point near edge within epsilon', () => {
    const point: Cartesian = { x: 2, y: 2 + 1e-11 };
    expect(isOnPolygon(point, square, 1e-10)).toBeTrue();
  });

  test('point near edge outside epsilon', () => {
    const point: Cartesian = { x: 2, y: 2 + 1e-8 };
    expect(isOnPolygon(point, square, 1e-10)).toBeFalse();
  });

  test('empty polygon', () => {
    const point: Cartesian = { x: 0, y: 0 };
    expect(isOnPolygon(point, [])).toBeFalse();
  });

  test('polygon with one vertex', () => {
    const point: Cartesian = { x: 1, y: 1 };
    const poly: Polygon = [{ x: 1, y: 1 }];
    expect(isOnPolygon(point, poly)).toBeFalse();
  });

  test('polygon with two vertices (degenerate line)', () => {
    const point: Cartesian = { x: 1, y: 1 };
    const poly: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ];
    expect(isOnPolygon(point, poly)).toBeTrue();
  });
});
