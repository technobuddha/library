import { toCartesian } from './to-cartesian.ts';

describe('toCartesian', () => {
  test('converts positive angles', () => {
    expect(toCartesian({ radius: 10, angle: 0 / 4 })).toBeDeepCloseTo({ x: 10, y: 0 });
    expect(toCartesian({ radius: 10, angle: Math.PI / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (2 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ radius: 10, angle: (3 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (4 * Math.PI) / 4 })).toBeDeepCloseTo({ x: -10, y: 0 });
    expect(toCartesian({ radius: 10, angle: (5 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (6 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: -10 });
    expect(toCartesian({ radius: 10, angle: (7 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
  });

  test('converts negative angles', () => {
    expect(toCartesian({ radius: 10, angle: (-0 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 10, y: 0 });
    expect(toCartesian({ radius: 10, angle: (-1 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (-2 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 0,
      y: -10,
    });
    expect(toCartesian({ radius: 10, angle: (-3 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (-4 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10,
      y: 0,
    });
    expect(toCartesian({ radius: 10, angle: (-5 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (-6 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ radius: 10, angle: (-7 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
  });

  test('converts positive angles greater than full', () => {
    expect(toCartesian({ radius: 10, angle: (8 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 10, y: 0 });
    expect(toCartesian({ radius: 10, angle: (9 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (10 * Math.PI) / 4 })).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ radius: 10, angle: (11 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: 10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (12 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10,
      y: 0,
    });
    expect(toCartesian({ radius: 10, angle: (13 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: -10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
    expect(toCartesian({ radius: 10, angle: (14 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 0,
      y: -10,
    });
    expect(toCartesian({ radius: 10, angle: (15 * Math.PI) / 4 })).toBeDeepCloseTo({
      x: 10 / Math.SQRT2,
      y: -10 / Math.SQRT2,
    });
  });

  test('Converts units', () => {
    expect(toCartesian({ radius: 10, angle: 90 }, 'degrees')).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ radius: 10, angle: 100 }, 'grads')).toBeDeepCloseTo({ x: 0, y: 10 });
    expect(toCartesian({ radius: 10, angle: 0.25 }, 'turns')).toBeDeepCloseTo({ x: 0, y: 10 });
  });
});
