import { type LineSegment, type Polygon } from './@types/geometry.ts';
import { polygonSides } from './polygon-sides.ts';

describe('polygonSides', () => {
  test('generates sides for a triangle', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
    ];

    const sides = Array.from(polygonSides(triangle));

    expect(sides).toHaveLength(3);
    expect(sides[0]).toEqual({ x0: 0, y0: 0, x1: 2, y1: 0 }); // bottom edge
    expect(sides[1]).toEqual({ x0: 2, y0: 0, x1: 1, y1: 2 }); // right edge
    expect(sides[2]).toEqual({ x0: 1, y0: 2, x1: 0, y1: 0 }); // left edge (wraps to start)
  });

  test('generates sides for a square', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    const sides = Array.from(polygonSides(square));

    expect(sides).toHaveLength(4);
    expect(sides[0]).toEqual({ x0: 0, y0: 0, x1: 2, y1: 0 }); // bottom
    expect(sides[1]).toEqual({ x0: 2, y0: 0, x1: 2, y1: 2 }); // right
    expect(sides[2]).toEqual({ x0: 2, y0: 2, x1: 0, y1: 2 }); // top
    expect(sides[3]).toEqual({ x0: 0, y0: 2, x1: 0, y1: 0 }); // left (wraps to start)
  });

  test('generates sides for a pentagon', () => {
    const pentagon: Polygon = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2.5, y: 1.5 },
      { x: 1, y: 2 },
    ];

    const sides = Array.from(polygonSides(pentagon));

    expect(sides).toHaveLength(5);
    expect(sides[0]).toEqual({ x0: 0, y0: 1, x1: 1, y1: 0 });
    expect(sides[1]).toEqual({ x0: 1, y0: 0, x1: 2, y1: 0 });
    expect(sides[2]).toEqual({ x0: 2, y0: 0, x1: 2.5, y1: 1.5 });
    expect(sides[3]).toEqual({ x0: 2.5, y0: 1.5, x1: 1, y1: 2 });
    expect(sides[4]).toEqual({ x0: 1, y0: 2, x1: 0, y1: 1 }); // wraps to start
  });

  test('handles minimal triangle (3 vertices)', () => {
    const minimal: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const sides = Array.from(polygonSides(minimal));

    expect(sides).toHaveLength(3);
    expect(sides[0]).toEqual({ x0: 0, y0: 0, x1: 1, y1: 0 });
    expect(sides[1]).toEqual({ x0: 1, y0: 0, x1: 0, y1: 1 });
    expect(sides[2]).toEqual({ x0: 0, y0: 1, x1: 0, y1: 0 }); // wraps
  });

  test('works as iterator without Array.from', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const sides: LineSegment[] = [];
    for (const side of polygonSides(triangle)) {
      sides.push(side);
    }

    expect(sides).toHaveLength(3);
    expect(sides[0]).toEqual({ x0: 0, y0: 0, x1: 1, y1: 0 });
  });

  test('handles polygon with duplicate consecutive points', () => {
    const withDuplicates: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 0 }, // duplicate
      { x: 0, y: 1 },
    ];

    const sides = Array.from(polygonSides(withDuplicates));

    expect(sides).toHaveLength(4);
    expect(sides[0]).toEqual({ x0: 0, y0: 0, x1: 1, y1: 0 });
    expect(sides[1]).toEqual({ x0: 1, y0: 0, x1: 1, y1: 0 }); // zero-length side
    expect(sides[2]).toEqual({ x0: 1, y0: 0, x1: 0, y1: 1 });
    expect(sides[3]).toEqual({ x0: 0, y0: 1, x1: 0, y1: 0 });
  });

  test('handles single vertex polygon gracefully', () => {
    const singleVertex: Polygon = [{ x: 5, y: 5 }];

    const sides = Array.from(polygonSides(singleVertex));

    expect(sides).toHaveLength(1);
    expect(sides[0]).toEqual({ x0: 5, y0: 5, x1: 5, y1: 5 }); // self-loop
  });

  test('handles empty polygon', () => {
    const empty: Polygon = [];

    const sides = Array.from(polygonSides(empty));

    expect(sides).toHaveLength(0);
  });

  test('generator can be reused', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const generator1 = polygonSides(triangle);
    const generator2 = polygonSides(triangle);

    const sides1 = Array.from(generator1);
    const sides2 = Array.from(generator2);

    expect(sides1).toEqual(sides2);
    expect(sides1).toHaveLength(3);
  });
});
