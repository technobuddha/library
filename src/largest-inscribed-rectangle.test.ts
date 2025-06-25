import { type Polygon } from './geometry.ts';
import { largestInscribedRectangle } from './largest-inscribed-rectangle.ts';

// Helper: Rectangle polygon
function rectPolygon(x: number, y: number, width: number, height: number): Polygon {
  return [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ];
}

describe('largestInscribedRectangle', () => {
  test('throws for polygons with less than 3 vertices', () => {
    expect(() => largestInscribedRectangle([])).toThrow();
    expect(() =>
      largestInscribedRectangle([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ]),
    ).toThrow();
  });

  test('returns the polygon itself for rectangle polygons', () => {
    const poly = rectPolygon(1, 2, 5, 3);

    // Aligned mode
    const alignedRect = largestInscribedRectangle(poly, { aligned: true });
    expect(alignedRect).toBeDeepCloseTo({ x: 1, y: 2, width: 5, height: 3 });

    // Rotated mode should prefer 0° orientation
    const rotatedRect = largestInscribedRectangle(poly, { aligned: false });
    expect(rotatedRect.width * rotatedRect.height).toBeCloseTo(15);
    expect(rotatedRect.angle).toBeCloseTo(0);
  });

  test('finds correct rectangle in right triangle', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 4 },
    ];
    const rect = largestInscribedRectangle(triangle, { aligned: true });

    // Mathematical result: 2×2 square at origin
    expect(rect.x).toBeCloseTo(0);
    expect(rect.y).toBeCloseTo(0);
    expect(rect.width).toBeCloseTo(2);
    expect(rect.height).toBeCloseTo(2);
  });

  test('handles degenerate polygons gracefully', () => {
    // Collinear points (zero area)
    const poly: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    const rect = largestInscribedRectangle(poly, { aligned: true });

    expect(rect.width).toBe(0);
    expect(rect.height).toBe(0);
  });

  test('squareOnly mode produces squares', () => {
    const poly = rectPolygon(0, 0, 6, 4);

    const rectResult = largestInscribedRectangle(poly, { aligned: true, squareOnly: false });
    const squareResult = largestInscribedRectangle(poly, { aligned: true, squareOnly: true });

    // Rectangle mode: full 6×4
    expect(rectResult.width * rectResult.height).toBeCloseTo(24);

    // Square mode: 4×4 (limited by height)
    expect(squareResult.width).toBeCloseTo(squareResult.height);
    expect(squareResult.width).toBeCloseTo(4);
    expect(squareResult.width * squareResult.height).toBeLessThanOrEqual(
      rectResult.width * rectResult.height,
    );
  });

  test('rotated mode finds better solutions than aligned', () => {
    // Diamond: rotated square where rotated rectangle should be better
    const diamond: Polygon = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ];

    const alignedRect = largestInscribedRectangle(diamond, { aligned: true });
    const rotatedRect = largestInscribedRectangle(diamond, { aligned: false });

    // Rotated should find larger area than aligned
    expect(rotatedRect.area).toBeGreaterThanOrEqual(alignedRect.width * alignedRect.height);
    expect(rotatedRect.angle).toBeCloseTo(Math.PI / 4, 1); // 45 degrees
  });

  test('algorithm consistency and properties', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 0, y: 6 },
    ];

    const rectResult = largestInscribedRectangle(triangle, { aligned: false });
    const squareResult = largestInscribedRectangle(triangle, { aligned: false, squareOnly: true });

    // Properties that should always hold:
    expect(rectResult.width).toBeGreaterThan(0);
    expect(rectResult.height).toBeGreaterThan(0);
    expect(rectResult.area).toBeGreaterThan(0);
    expect(rectResult.area).toBeLessThan(18); // Less than triangle area

    // Square should be smaller than rectangle
    expect(squareResult.area).toBeLessThanOrEqual(rectResult.area);
    expect(squareResult.width).toBeCloseTo(squareResult.height, 2);
  });

  test('regression test - algorithm output stability', () => {
    // Pentagon test - just ensure algorithm produces consistent results
    const pentagon: Polygon = Array.from({ length: 5 }, (_, i) => {
      const angle = (2 * Math.PI * i) / 5 - Math.PI / 2;
      return { x: 2 * Math.cos(angle), y: 2 * Math.sin(angle) };
    });

    const rect = largestInscribedRectangle(pentagon, { aligned: false });

    // Record what the algorithm actually finds (regression test)
    expect(rect.width).toBeCloseTo(2.341, 1);
    expect(rect.height).toBeCloseTo(2.764, 1);
    expect(rect.area).toBeCloseTo(6.472, 1); // Updated area (2.341 * 2.764)

    // Verify it's a reasonable solution
    expect(rect.area).toBeLessThan(9.5); // Less than pentagon area
    expect(rect.area).toBeGreaterThan(3); // Significant area
  });
});
