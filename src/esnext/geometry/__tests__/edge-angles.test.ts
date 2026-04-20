import { edgeAngles } from '../edge-angles.ts';
import { type Polygon } from '../geometry.ts';

describe('edgeAngles', () => {
  test('generates angles for a horizontal line triangle', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
    ];

    const angles = Array.from(edgeAngles(triangle));

    expect(angles).toHaveLength(3);
    expect(angles[0]).toBeCloseTo(0, 5); // horizontal line (0° normalized)
    expect(angles[1]).toBeCloseTo(2.034, 2); // ~116.57° normalized to [0, 2π]
    expect(angles[2]).toBeCloseTo(4.249, 2); // ~243.43° normalized to [0, 2π]
  });

  test('generates angles for axis-aligned square', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    const angles = Array.from(edgeAngles(square));

    expect(angles).toHaveLength(4);
    expect(angles[0]).toBeCloseTo(0, 5); // 0° (horizontal right)
    expect(angles[1]).toBeCloseTo(Math.PI / 2, 5); // 90° (vertical up)
    expect(angles[2]).toBeCloseTo(Math.PI, 5); // 180° (horizontal left)
    expect(angles[3]).toBeCloseTo((3 * Math.PI) / 2, 5); // 270° (vertical down)
  });

  test('normalizes angles to π/2 range (quadrant)', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    const angles = Array.from(edgeAngles(square, { normalizeTo: Math.PI / 2 }));

    expect(angles).toHaveLength(4);
    expect(angles[0]).toBeCloseTo(0, 5); // 0° stays 0°
    expect(angles[1]).toBeCloseTo(0, 5); // π/2 modulo π/2 = 0
    expect(angles[2]).toBeCloseTo(0, 5); // π modulo π/2 = 0
    expect(angles[3]).toBeCloseTo(0, 5); // -π/2 modulo π/2 = 0
  });

  test('normalizes angles to π range (half rotation)', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    const angles = Array.from(edgeAngles(square, { normalizeTo: Math.PI }));

    expect(angles).toHaveLength(4);
    expect(angles[0]).toBeCloseTo(0, 5); // 0° stays 0°
    expect(angles[1]).toBeCloseTo(Math.PI / 2, 5); // 90° stays 90°
    expect(angles[2]).toBeCloseTo(0, 5); // 180° wraps to 0°
    expect(angles[3]).toBeCloseTo(Math.PI / 2, 5); // 270° wraps to π/2
  });

  test('uses default normalization (2π) when not specified', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const defaultAngles = Array.from(edgeAngles(triangle));
    const explicitAngles = Array.from(edgeAngles(triangle, { normalizeTo: Math.PI * 2 }));

    expect(defaultAngles).toEqual(explicitAngles);
    expect(defaultAngles).toHaveLength(3);
  });

  test('handles triangle with negative angles', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ];

    const angles = Array.from(edgeAngles(triangle));

    expect(angles).toHaveLength(3);
    // All angles should be positive after normalization
    for (const angle of angles) {
      expect(angle).toBeGreaterThanOrEqual(0);
      expect(angle).toBeLessThan(Math.PI * 2);
    }
  });

  test('handles degenerate polygon (line)', () => {
    const line: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];

    const angles = Array.from(edgeAngles(line));

    expect(angles).toHaveLength(2);
    expect(angles[0]).toBeCloseTo(0, 5); // 0° to 1°
    expect(angles[1]).toBeCloseTo(Math.PI, 5); // 180° back
  });

  test('handles single point polygon', () => {
    const point: Polygon = [{ x: 5, y: 5 }];

    const angles = Array.from(edgeAngles(point));

    expect(angles).toHaveLength(1);
    expect(angles[0]).toBeCloseTo(0, 5); // Self-loop has 0 angle
  });

  test('handles empty polygon', () => {
    const empty: Polygon = [];

    const angles = Array.from(edgeAngles(empty));

    expect(angles).toHaveLength(0);
  });

  test('works as iterator without Array.from', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const angles: number[] = [];
    for (const angle of edgeAngles(triangle)) {
      angles.push(angle);
    }

    expect(angles).toHaveLength(3);
    expect(angles[0]).toBeCloseTo(0, 5);
  });

  test('generator can be reused', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const generator1 = edgeAngles(triangle);
    const generator2 = edgeAngles(triangle);

    const angles1 = Array.from(generator1);
    const angles2 = Array.from(generator2);

    expect(angles1).toEqual(angles2);
    expect(angles1).toHaveLength(3);
  });

  test('handles very small normalization values', () => {
    const triangle: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const angles = Array.from(edgeAngles(triangle, { normalizeTo: 0.1 }));

    expect(angles).toHaveLength(3);
    // All angles should be in [0, 0.1) range
    for (const angle of angles) {
      expect(angle).toBeGreaterThanOrEqual(0);
      expect(angle).toBeLessThan(0.1);
    }
  });

  test('supports normalization and output in degrees', () => {
    const square: Polygon = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ];

    const angles = Array.from(edgeAngles(square, { normalizeTo: 90, unit: 'degrees' }));

    expect(angles).toHaveLength(4);
    for (const angle of angles) {
      expect(angle).toBeGreaterThanOrEqual(0);
      expect(angle).toBeLessThan(90);
      expect(angle).toBeCloseTo(0, 12);
    }
  });
});
