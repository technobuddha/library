import { normalizeAngle } from '../normalize-angle.ts';

describe('normalizeAngle', () => {
  test('converts positive angles', () => {
    expect(normalizeAngle((0 * Math.PI) / 2)).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle((1 * Math.PI) / 2)).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle((2 * Math.PI) / 2)).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle((3 * Math.PI) / 2)).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle((4 * Math.PI) / 2)).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle((5 * Math.PI) / 2)).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle((6 * Math.PI) / 2)).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle((7 * Math.PI) / 2)).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle((8 * Math.PI) / 2)).toBe((0 * Math.PI) / 2);
  });

  test('converts negative angles', () => {
    expect(normalizeAngle((-0 * Math.PI) / 2)).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle((-1 * Math.PI) / 2)).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle((-2 * Math.PI) / 2)).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle((-3 * Math.PI) / 2)).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle((-4 * Math.PI) / 2)).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle((-5 * Math.PI) / 2)).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle((-6 * Math.PI) / 2)).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle((-7 * Math.PI) / 2)).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle((-8 * Math.PI) / 2)).toBe((0 * Math.PI) / 2);
  });

  test('converts positive angles with units', () => {
    expect(normalizeAngle(0, { unit: 'degrees' })).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle(90, { unit: 'degrees' })).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle(180, { unit: 'degrees' })).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle(270, { unit: 'degrees' })).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle(360, { unit: 'degrees' })).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle(450, { unit: 'degrees' })).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle(540, { unit: 'degrees' })).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle(630, { unit: 'degrees' })).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle(720, { unit: 'degrees' })).toBe((0 * Math.PI) / 2);
  });

  test('converts negative angles with units', () => {
    expect(normalizeAngle(-0, { unit: 'degrees' })).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle(-90, { unit: 'degrees' })).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle(-180, { unit: 'degrees' })).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle(-270, { unit: 'degrees' })).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle(-360, { unit: 'degrees' })).toBe((0 * Math.PI) / 2);
    expect(normalizeAngle(-450, { unit: 'degrees' })).toBe((3 * Math.PI) / 2);
    expect(normalizeAngle(-540, { unit: 'degrees' })).toBe((2 * Math.PI) / 2);
    expect(normalizeAngle(-630, { unit: 'degrees' })).toBe((1 * Math.PI) / 2);
    expect(normalizeAngle(-720, { unit: 'degrees' })).toBe((0 * Math.PI) / 2);
  });
});
