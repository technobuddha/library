import { angleOfLine } from './angle-of-line.ts';
import { type LineSegment } from './geometry.ts';

describe('angleOfLine', () => {
  test('should return 0 for horizontal line to the right (radians)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 1, y1: 0 };
    const result = angleOfLine(line, undefined);
    expect(result).toBeCloseTo(0, 10);
  });

  test('should return π/2 for vertical line upwards (radians)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 0, y1: 1 };
    const result = angleOfLine(line, undefined);
    expect(result).toBeCloseTo(Math.PI / 2, 10);
  });

  test('should return π for horizontal line to the left (radians)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: -1, y1: 0 };
    const result = angleOfLine(line, undefined);
    expect(result).toBeCloseTo(Math.PI, 10);
  });

  test('should return -π/2 for vertical line downwards (radians)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 0, y1: -1 };
    const result = angleOfLine(line, undefined);
    expect(result).toBeCloseTo(-Math.PI / 2, 10);
  });

  test('should return correct angle for arbitrary line (radians)', () => {
    const line: LineSegment = { x0: 1, y0: 1, x1: 4, y1: 5 };
    const expected = Math.atan2(5 - 1, 4 - 1);
    const result = angleOfLine(line, undefined);
    expect(result).toBeCloseTo(expected, 10);
  });

  test('should return 0 for horizontal line to the right (degrees)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 1, y1: 0 };
    const result = angleOfLine(line, 'degrees');
    expect(result).toBeCloseTo(0, 10);
  });

  test('should return 90 for vertical line upwards (degrees)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 0, y1: 1 };
    const result = angleOfLine(line, 'degrees');
    expect(result).toBeCloseTo(90, 10);
  });

  test('should return 180 for horizontal line to the left (degrees)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: -1, y1: 0 };
    const result = angleOfLine(line, 'degrees');
    expect(result).toBeCloseTo(180, 10);
  });

  test('should return -90 for vertical line downwards (degrees)', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 0, y1: -1 };
    const result = angleOfLine(line, 'degrees');
    expect(result).toBeCloseTo(-90, 10);
  });

  test('should default to radians if units not specified', () => {
    const line: LineSegment = { x0: 0, y0: 0, x1: 0, y1: 1 };
    const result = angleOfLine(line);
    expect(result).toBeCloseTo(Math.PI / 2, 10);
  });
});
