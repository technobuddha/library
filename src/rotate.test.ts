import { rotate } from './rotate.ts';

describe('rotate', () => {
  test('rotate single point', () => {
    const point = { x: 1, y: 0 };
    const angle = Math.PI / 2; // 90 degrees
    const rotated = rotate(point, angle);
    expect(rotated).toBeDeepCloseTo({ x: 0, y: 1 });
  });

  test('rotate multiple points', () => {
    const points = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    const angle = Math.PI / 2; // 90 degrees
    const rotated = rotate(points, angle);
    expect(rotated).toBeDeepCloseTo([
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ]);
  });

  test('rotate around a specific origin', () => {
    const point = { x: 2, y: 3 };
    const angle = Math.PI / 4; // 45 degrees
    const origin = { x: 1, y: 1 };
    const rotated = rotate(point, angle, origin);
    expect(rotated).toBeDeepCloseTo({ x: 1 - Math.SQRT1_2, y: (2 + 3 * Math.SQRT2) / 2 });
  });
});
