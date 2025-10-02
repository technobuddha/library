import { crossProduct } from '../cross-product.ts';
import { type Cartesian } from '../geometry.ts';

describe('crossProduct', () => {
  test('should return positive value for counter-clockwise turn', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 1, y: 0 };
    const b: Cartesian = { x: 0, y: 1 };

    const result = crossProduct(a, b, o);
    expect(result).toBeGreaterThan(0);
    expect(result).toBe(1);
  });

  test('should return negative value for clockwise turn', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 0, y: 1 };
    const b: Cartesian = { x: 1, y: 0 };

    const result = crossProduct(a, b, o);
    expect(result).toBeLessThan(0);
    expect(result).toBe(-1);
  });

  test('should return zero for collinear points', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 1, y: 1 };
    const b: Cartesian = { x: 2, y: 2 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0);
  });

  test('should return zero when all points are the same', () => {
    const point: Cartesian = { x: 5, y: 3 };

    const result = crossProduct(point, point, point);
    expect(result).toBe(0);
  });

  test('should return zero when origin equals point a', () => {
    const o: Cartesian = { x: 1, y: 1 };
    const a: Cartesian = { x: 1, y: 1 };
    const b: Cartesian = { x: 3, y: 4 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0);
  });

  test('should return zero when origin equals point b', () => {
    const o: Cartesian = { x: 2, y: 3 };
    const a: Cartesian = { x: 5, y: 1 };
    const b: Cartesian = { x: 2, y: 3 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0);
  });

  test('should work with different origin point', () => {
    const o: Cartesian = { x: 2, y: 2 };
    const a: Cartesian = { x: 3, y: 2 }; // Vector OA = (1, 0)
    const b: Cartesian = { x: 2, y: 3 }; // Vector OB = (0, 1)

    const result = crossProduct(a, b, o);
    expect(result).toBe(1); // Same as unit vectors from origin
  });

  test('should handle negative coordinates', () => {
    const o: Cartesian = { x: -1, y: -1 };
    const a: Cartesian = { x: 0, y: -1 }; // Vector OA = (1, 0)
    const b: Cartesian = { x: -1, y: 0 }; // Vector OB = (0, 1)

    const result = crossProduct(a, b, o);
    expect(result).toBe(1); // Counter-clockwise
  });

  test('should handle floating point coordinates', () => {
    const o: Cartesian = { x: 0.5, y: 0.5 };
    const a: Cartesian = { x: 1.5, y: 0.5 }; // Vector OA = (1, 0)
    const b: Cartesian = { x: 0.5, y: 1.5 }; // Vector OB = (0, 1)

    const result = crossProduct(a, b, o);
    expect(result).toBeCloseTo(1, 10);
  });

  test('should calculate correct magnitude for larger vectors', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 3, y: 0 }; // Vector OA = (3, 0)
    const b: Cartesian = { x: 0, y: 4 }; // Vector OB = (0, 4)

    const result = crossProduct(a, b, o);
    expect(result).toBe(12); // |OA| × |OB| × sin(90°) = 3 × 4 × 1
  });

  test('should handle vectors in different quadrants', () => {
    const o: Cartesian = { x: 0, y: 0 };

    // First to second quadrant (counter-clockwise)
    let a: Cartesian = { x: 1, y: 0 };
    let b: Cartesian = { x: -1, y: 1 };
    expect(crossProduct(a, b, o)).toBeGreaterThan(0);

    // Second to third quadrant (counter-clockwise)
    a = { x: -1, y: 1 };
    b = { x: -1, y: -1 };
    expect(crossProduct(a, b, o)).toBeGreaterThan(0);

    // Third to fourth quadrant (counter-clockwise)
    a = { x: -1, y: -1 };
    b = { x: 1, y: -1 };
    expect(crossProduct(a, b, o)).toBeGreaterThan(0);

    // Fourth to first quadrant (counter-clockwise)
    a = { x: 1, y: -1 };
    b = { x: 1, y: 1 };
    expect(crossProduct(a, b, o)).toBeGreaterThan(0);
  });

  test('should handle reverse direction (clockwise)', () => {
    const o: Cartesian = { x: 0, y: 0 };

    // First to fourth quadrant (clockwise)
    const a: Cartesian = { x: 1, y: 0 };
    const b: Cartesian = { x: 1, y: -1 };

    expect(crossProduct(a, b, o)).toBeLessThan(0);
  });

  test('should be anti-commutative', () => {
    const o: Cartesian = { x: 1, y: 1 };
    const a: Cartesian = { x: 2, y: 3 };
    const b: Cartesian = { x: 4, y: 2 };

    const result1 = crossProduct(a, b, o);
    const result2 = crossProduct(b, a, o);

    expect(result1).toBe(-result2);
  });

  test('should handle large coordinates', () => {
    const o: Cartesian = { x: 1000000, y: 1000000 };
    const a: Cartesian = { x: 1000001, y: 1000000 };
    const b: Cartesian = { x: 1000000, y: 1000001 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(1);
  });

  test('should handle very small coordinates', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 0.001, y: 0 };
    const b: Cartesian = { x: 0, y: 0.001 };

    const result = crossProduct(a, b, o);
    expect(result).toBeCloseTo(0.000001, 10);
    expect(result).toBeGreaterThan(0);
  });

  test('should calculate cross product for arbitrary triangle', () => {
    // Triangle with vertices at (0,0), (3,0), (1,2)
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 3, y: 0 };
    const b: Cartesian = { x: 1, y: 2 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(6); // This represents twice the area of the triangle
  });

  test('should handle horizontal lines', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 1, y: 0 };
    const b: Cartesian = { x: 2, y: 0 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0); // Collinear horizontal line
  });

  test('should handle vertical lines', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 0, y: 1 };
    const b: Cartesian = { x: 0, y: 2 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0); // Collinear vertical line
  });

  test('should handle diagonal lines', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 1, y: 1 };
    const b: Cartesian = { x: 3, y: 3 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0); // Collinear diagonal line
  });

  test('should distinguish between nearly collinear points', () => {
    const o: Cartesian = { x: 0, y: 0 };
    const a: Cartesian = { x: 1, y: 0 };
    const b: Cartesian = { x: 2, y: 0.001 }; // Slightly off the line

    const result = crossProduct(a, b, o);
    expect(result).toBeCloseTo(0.001, 10);
    expect(result).toBeGreaterThan(0);
  });

  test('should work with complex polygon orientation check', () => {
    // Check if point C is to the left of line AB
    const a: Cartesian = { x: 1, y: 1 };
    const b: Cartesian = { x: 4, y: 3 };
    const c: Cartesian = { x: 2, y: 4 }; // Point to test

    // Use point A as origin, check orientation of AB vs AC
    const result = crossProduct(b, c, a);
    expect(result).toBeGreaterThan(0); // C is to the left of AB (counter-clockwise)
  });

  test('should handle zero vectors', () => {
    const o: Cartesian = { x: 5, y: 3 };
    const a: Cartesian = { x: 5, y: 3 }; // Same as origin (zero vector OA)
    const b: Cartesian = { x: 7, y: 8 };

    const result = crossProduct(a, b, o);
    expect(result).toBe(0); // Cross product with zero vector is zero
  });
});
