import { toRadians } from '../to-radians.ts';

describe('toRadians', () => {
  test('converts positive angles', () => {
    expect(toRadians(0)).toBe((0 * Math.PI) / 2);
    expect(toRadians(90)).toBe(Math.PI / 2);
    expect(toRadians(180)).toBe((2 * Math.PI) / 2);
    expect(toRadians(270)).toBe((3 * Math.PI) / 2);
    expect(toRadians(360)).toBe((4 * Math.PI) / 2);
    expect(toRadians(450)).toBe((5 * Math.PI) / 2);
    expect(toRadians(540)).toBe((6 * Math.PI) / 2);
    expect(toRadians(630)).toBe((7 * Math.PI) / 2);
    expect(toRadians(720)).toBe((8 * Math.PI) / 2);
  });

  test('converts negative angles', () => {
    expect(toRadians(-0)).toBe((-0 * Math.PI) / 2);
    expect(toRadians(-90)).toBe((-1 * Math.PI) / 2);
    expect(toRadians(-180)).toBe((-2 * Math.PI) / 2);
    expect(toRadians(-270)).toBe((-3 * Math.PI) / 2);
    expect(toRadians(-360)).toBe((-4 * Math.PI) / 2);
    expect(toRadians(-450)).toBe((-5 * Math.PI) / 2);
    expect(toRadians(-540)).toBe((-6 * Math.PI) / 2);
    expect(toRadians(-630)).toBe((-7 * Math.PI) / 2);
    expect(toRadians(-720)).toBe((-8 * Math.PI) / 2);
  });

  test('accepts units', () => {
    expect(toRadians(90, { unit: 'degrees' })).toBeCloseTo(Math.PI / 2);
    expect(toRadians(Math.PI / 2, { unit: 'radians' })).toBeCloseTo(Math.PI / 2);
    expect(toRadians(Math.PI / 2, { unit: 'rad' })).toBeCloseTo(Math.PI / 2);
    expect(toRadians(100, { unit: 'gradians' })).toBeCloseTo(Math.PI / 2);
    expect(toRadians(100, { unit: 'grad' })).toBeCloseTo(Math.PI / 2);
    expect(toRadians(1 / 4, { unit: 'turns' })).toBeCloseTo(Math.PI / 2);
  });
});
