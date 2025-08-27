import { type Cartesian, type Polar } from './@types/geometry.ts';

describe('coordinates', () => {
  test('Polar', () => {
    const polar: Polar = { φ: Math.PI / 4, r: 100 };
    expect(polar).toEqual({ φ: Math.PI / 4, r: 100 });
  });

  test('Cartesian', () => {
    const cartesian: Cartesian = { x: 100, y: 200 };
    expect(cartesian).toEqual({ x: 100, y: 200 });
  });
});
