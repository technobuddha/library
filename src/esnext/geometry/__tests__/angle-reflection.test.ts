import { angleReflection } from '../angle-reflection.ts';

describe('angleReflection', () => {
  test('reflects 0 across π/2', () => {
    const result = angleReflection(0, Math.PI / 2);
    expect(result).toBeCloseTo(Math.PI);
  });

  test('reflects π/4 across π/2', () => {
    const result = angleReflection(Math.PI / 4, Math.PI / 2);
    expect(result).toBeCloseTo((Math.PI * 3) / 4);
  });

  test('reflects π across 0', () => {
    const result = angleReflection(Math.PI, 0);
    expect(result).toBeCloseTo(Math.PI);
  });

  test('reflects negative angle across π', () => {
    const result = angleReflection(-Math.PI / 2, Math.PI);
    expect(result).toBeCloseTo(Math.PI / 2);
  });

  test('reflects angle with units parameter', () => {
    const result = angleReflection(60, 30, { unit: 'degrees' });
    expect(result).toBeCloseTo(0);
  });

  test('reflects angle where result wraps around 2π', () => {
    const result = angleReflection((3 * Math.PI) / 2, Math.PI);
    expect(result).toBeCloseTo(Math.PI / 2);
  });

  test('reflects 0 across 0', () => {
    const result = angleReflection(0, 0);
    expect(result).toBeCloseTo(0);
  });

  test('reflects π/2 across π/2', () => {
    const result = angleReflection(Math.PI / 2, Math.PI / 2);
    expect(result).toBeCloseTo(Math.PI / 2);
  });
});
