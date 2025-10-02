import { toPolar } from '../to-polar.ts';

describe('toPolar', () => {
  test('converts positive angles', () => {
    expect(toPolar({ x: 10, y: 0 })).toBeDeepCloseTo({ r: 10, φ: 0 });
    expect(toPolar({ x: 10 / Math.SQRT2, y: 10 / Math.SQRT2 })).toBeDeepCloseTo({
      r: 10,
      φ: Math.PI / 4,
    });
    expect(toPolar({ x: 0, y: 10 })).toBeDeepCloseTo({ r: 10, φ: (2 * Math.PI) / 4 });
    expect(toPolar({ x: -10 / Math.SQRT2, y: 10 / Math.SQRT2 })).toBeDeepCloseTo({
      r: 10,
      φ: (3 * Math.PI) / 4,
    });
    expect(toPolar({ x: -10, y: 0 })).toBeDeepCloseTo({ r: 10, φ: (4 * Math.PI) / 4 });
    expect(toPolar({ x: -10 / Math.SQRT2, y: -10 / Math.SQRT2 })).toBeDeepCloseTo({
      r: 10,
      φ: (5 * Math.PI) / 4,
    });
    expect(toPolar({ x: 0, y: -10 })).toBeDeepCloseTo({ r: 10, φ: (6 * Math.PI) / 4 });
    expect(toPolar({ x: 10 / Math.SQRT2, y: -10 / Math.SQRT2 })).toBeDeepCloseTo({
      r: 10,
      φ: (7 * Math.PI) / 4,
    });
  });

  test('returns zero for origin', () => {
    expect(toPolar({ x: 0, y: 0 })).toBeDeepCloseTo({ r: 0, φ: 0 });
  });

  test('handles negative coordinates', () => {
    expect(toPolar({ x: -5, y: -5 })).toBeDeepCloseTo({
      r: Math.sqrt(50),
      φ: (5 * Math.PI) / 4,
    });
  });

  test('returns angle in degrees when unit is degrees', () => {
    expect(toPolar({ x: 0, y: 10 }, { unit: 'degrees' })).toBeDeepCloseTo({
      r: 10,
      φ: 90,
    });
    expect(toPolar({ x: 10, y: 0 }, { unit: 'degrees' })).toBeDeepCloseTo({
      r: 10,
      φ: 0,
    });
    expect(toPolar({ x: -10, y: 0 }, { unit: 'degrees' })).toBeDeepCloseTo({
      r: 10,
      φ: 180,
    });
    expect(toPolar({ x: 0, y: -10 }, { unit: 'degrees' })).toBeDeepCloseTo({
      r: 10,
      φ: 270,
    });
  });

  test('returns angle in turns when unit is turns', () => {
    expect(toPolar({ x: 0, y: 10 }, { unit: 'turns' })).toBeDeepCloseTo({
      r: 10,
      φ: 0.25,
    });
    expect(toPolar({ x: 10, y: 0 }, { unit: 'turns' })).toBeDeepCloseTo({
      r: 10,
      φ: 0,
    });
    expect(toPolar({ x: -10, y: 0 }, { unit: 'turns' })).toBeDeepCloseTo({
      r: 10,
      φ: 0.5,
    });
    expect(toPolar({ x: 0, y: -10 }, { unit: 'turns' })).toBeDeepCloseTo({
      r: 10,
      φ: 0.75,
    });
  });
});
