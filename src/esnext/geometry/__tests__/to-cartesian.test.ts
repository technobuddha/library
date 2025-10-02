import { toCartesian } from '../to-cartesian.ts';

describe('toCartesian', () => {
  test('converts positive angles', () => {
    expect(toCartesian({ r: 10, φ: 0 / 4 })).toBeDeepCloseTo({ x: 10, y: 0 });
    expect(toCartesian({ r: 10, φ: Math.PI / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (2 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ r: 10, φ: (3 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (4 * Math.PI) / 4 })).toBeDeepCloseTo({ x: -10, y: 0 });
    expect(toCartesian({ r: 10, φ: (5 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (6 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: -10 });
    expect(toCartesian({ r: 10, φ: (7 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
  });

  test('converts negative angles', () => {
    expect(toCartesian({ r: 10, φ: (-0 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 10, y: 0 });
    expect(toCartesian({ r: 10, φ: (-1 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (-2 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 0,
      y: -10,
    });
    expect(toCartesian({ r: 10, φ: (-3 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (-4 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10,
      y: 0,
    });
    expect(toCartesian({ r: 10, φ: (-5 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (-6 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ r: 10, φ: (-7 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
  });

  test('converts positive angles greater than full', () => {
    expect(toCartesian({ r: 10, φ: (8 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 10, y: 0 });
    expect(toCartesian({ r: 10, φ: (9 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (10 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ r: 10, φ: (11 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (12 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10,
      y: 0,
    });
    expect(toCartesian({ r: 10, φ: (13 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ r: 10, φ: (14 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 0,
      y: -10,
    });
    expect(toCartesian({ r: 10, φ: (15 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
  });

  test('Converts units', () => {
    expect(toCartesian({ r: 10, φ: 90 }, { unit: 'degrees' })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ r: 10, φ: 100 }, { unit: 'grad' })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ r: 10, φ: 0.25 }, { unit: 'turns' })).toBeDeepCloseTo({ x: 0, y: 10 });
  });
});
