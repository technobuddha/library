import { scale } from './scale.ts';

describe('scale', () => {
  test('scales a point uniformly from origin', () => {
    const point = { x: 1, y: 2 };
    expect(scale(point, 2)).toEqual({ x: 2, y: 4 });
  });

  test('scales a point non-uniformly from origin', () => {
    const point = { x: 1, y: 2 };
    expect(scale(point, { x: 3, y: 4 })).toEqual({ x: 3, y: 8 });
  });

  test('scales a point uniformly from a custom origin', () => {
    const point = { x: 2, y: 3 };
    const origin = { x: 1, y: 1 };
    expect(scale(point, 2, origin)).toEqual({ x: 3, y: 5 });
  });

  test('scales a point non-uniformly from a custom origin', () => {
    const point = { x: 2, y: 3 };
    const origin = { x: 1, y: 1 };
    expect(scale(point, { x: 2, y: 3 }, origin)).toEqual({ x: 3, y: 7 });
  });

  test('scales a polygon uniformly from origin', () => {
    const polygon = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    expect(scale(polygon, 2)).toEqual([
      { x: 2, y: 0 },
      { x: 0, y: 2 },
    ]);
  });

  test('scales a polygon non-uniformly from origin', () => {
    const polygon = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    expect(scale(polygon, { x: 2, y: 3 })).toEqual([
      { x: 2, y: 0 },
      { x: 0, y: 3 },
    ]);
  });

  test('scales a polygon uniformly from a custom origin', () => {
    const polygon = [
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    const origin = { x: 1, y: 1 };
    expect(scale(polygon, 2, origin)).toEqual([
      { x: 3, y: 3 },
      { x: 5, y: 5 },
    ]);
  });

  // ...rest of your tests
});
