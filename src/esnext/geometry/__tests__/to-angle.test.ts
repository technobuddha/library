/* eslint-disable no-implicit-coercion */
import { toAngle } from '../to-angle.ts';

describe('toAngle', () => {
  test('converts degrees', () => {
    expect(toAngle(-720, 'degrees', 'radians')).toBe((-8 * Math.PI) / 2);
    expect(toAngle(-630, 'degrees', 'radians')).toBe((-7 * Math.PI) / 2);
    expect(toAngle(-540, 'degrees', 'radians')).toBe((-6 * Math.PI) / 2);
    expect(toAngle(-450, 'degrees', 'radians')).toBe((-5 * Math.PI) / 2);
    expect(toAngle(-360, 'degrees', 'radians')).toBe((-4 * Math.PI) / 2);
    expect(toAngle(-270, 'degrees', 'radians')).toBe((-3 * Math.PI) / 2);
    expect(toAngle(-180, 'degrees', 'radians')).toBe((-2 * Math.PI) / 2);
    expect(toAngle(-90, 'degrees', 'radians')).toBe((-1 * Math.PI) / 2);
    expect(toAngle(0, 'degrees', 'radians')).toBe((0 * Math.PI) / 2);
    expect(toAngle(90, 'degrees', 'radians')).toBe((1 * Math.PI) / 2);
    expect(toAngle(180, 'degrees', 'radians')).toBe((2 * Math.PI) / 2);
    expect(toAngle(270, 'degrees', 'radians')).toBe((3 * Math.PI) / 2);
    expect(toAngle(360, 'degrees', 'radians')).toBe((4 * Math.PI) / 2);
    expect(toAngle(450, 'degrees', 'radians')).toBe((5 * Math.PI) / 2);
    expect(toAngle(540, 'degrees', 'radians')).toBe((6 * Math.PI) / 2);
    expect(toAngle(630, 'degrees', 'radians')).toBe((7 * Math.PI) / 2);
    expect(toAngle(720, 'degrees', 'radians')).toBe((8 * Math.PI) / 2);
  });

  test('converts gradians', () => {
    expect(toAngle(-800, 'gradians', 'radians')).toBe((-8 * Math.PI) / 2);
    expect(toAngle(-700, 'gradians', 'radians')).toBe((-7 * Math.PI) / 2);
    expect(toAngle(-600, 'gradians', 'radians')).toBe((-6 * Math.PI) / 2);
    expect(toAngle(-500, 'gradians', 'radians')).toBe((-5 * Math.PI) / 2);
    expect(toAngle(-400, 'gradians', 'radians')).toBe((-4 * Math.PI) / 2);
    expect(toAngle(-300, 'gradians', 'radians')).toBe((-3 * Math.PI) / 2);
    expect(toAngle(-200, 'gradians', 'radians')).toBe((-2 * Math.PI) / 2);
    expect(toAngle(-100, 'gradians', 'radians')).toBe((-1 * Math.PI) / 2);
    expect(toAngle(0, 'gradians', 'radians')).toBe((0 * Math.PI) / 2);
    expect(toAngle(100, 'gradians', 'radians')).toBe((1 * Math.PI) / 2);
    expect(toAngle(200, 'gradians', 'radians')).toBe((2 * Math.PI) / 2);
    expect(toAngle(300, 'gradians', 'radians')).toBe((3 * Math.PI) / 2);
    expect(toAngle(400, 'gradians', 'radians')).toBe((4 * Math.PI) / 2);
    expect(toAngle(500, 'gradians', 'radians')).toBe((5 * Math.PI) / 2);
    expect(toAngle(600, 'gradians', 'radians')).toBe((6 * Math.PI) / 2);
    expect(toAngle(700, 'gradians', 'radians')).toBe((7 * Math.PI) / 2);
    expect(toAngle(800, 'gradians', 'radians')).toBe((8 * Math.PI) / 2);
  });

  test('converts turns', () => {
    expect(toAngle(-2.0, 'turns', 'radians')).toBe((-8 * Math.PI) / 2);
    expect(toAngle(-1.75, 'turns', 'radians')).toBe((-7 * Math.PI) / 2);
    expect(toAngle(-1.5, 'turns', 'radians')).toBe((-6 * Math.PI) / 2);
    expect(toAngle(-1.25, 'turns', 'radians')).toBe((-5 * Math.PI) / 2);
    expect(toAngle(-1.0, 'turns', 'radians')).toBe((-4 * Math.PI) / 2);
    expect(toAngle(-0.75, 'turns', 'radians')).toBe((-3 * Math.PI) / 2);
    expect(toAngle(-0.5, 'turns', 'radians')).toBe((-2 * Math.PI) / 2);
    expect(toAngle(-0.25, 'turns', 'radians')).toBe((-1 * Math.PI) / 2);
    expect(toAngle(0, 'turns', 'radians')).toBe((0 * Math.PI) / 2);
    expect(toAngle(0.25, 'turns', 'radians')).toBe((1 * Math.PI) / 2);
    expect(toAngle(0.5, 'turns', 'radians')).toBe((2 * Math.PI) / 2);
    expect(toAngle(0.75, 'turns', 'radians')).toBe((3 * Math.PI) / 2);
    expect(toAngle(1.0, 'turns', 'radians')).toBe((4 * Math.PI) / 2);
    expect(toAngle(1.25, 'turns', 'radians')).toBe((5 * Math.PI) / 2);
    expect(toAngle(1.5, 'turns', 'radians')).toBe((6 * Math.PI) / 2);
    expect(toAngle(1.75, 'turns', 'radians')).toBe((7 * Math.PI) / 2);
    expect(toAngle(2.0, 'turns', 'radians')).toBe((8 * Math.PI) / 2);
  });

  test('converts units', () => {
    expect(toAngle(Math.PI * 2, 'radians', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(Math.PI * 2, 'radians', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(Math.PI * 2, 'radians', 'degrees')).toBe(360);
    expect(toAngle(Math.PI * 2, 'radians', 'deg')).toBe(360);
    expect(toAngle(Math.PI * 2, 'radians', 'gradians')).toBe(400);
    expect(toAngle(Math.PI * 2, 'radians', 'grad')).toBe(400);
    expect(toAngle(Math.PI * 2, 'radians', 'turns')).toBe(1);

    expect(toAngle(Math.PI * 2, 'rad', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(Math.PI * 2, 'rad', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(Math.PI * 2, 'rad', 'degrees')).toBe(360);
    expect(toAngle(Math.PI * 2, 'rad', 'deg')).toBe(360);
    expect(toAngle(Math.PI * 2, 'rad', 'gradians')).toBe(400);
    expect(toAngle(Math.PI * 2, 'rad', 'grad')).toBe(400);
    expect(toAngle(Math.PI * 2, 'rad', 'turns')).toBe(1);

    expect(toAngle(360, 'degrees', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(360, 'degrees', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(360, 'degrees', 'degrees')).toBe(360);
    expect(toAngle(360, 'degrees', 'deg')).toBe(360);
    expect(toAngle(360, 'degrees', 'gradians')).toBe(400);
    expect(toAngle(360, 'degrees', 'grad')).toBe(400);
    expect(toAngle(360, 'degrees', 'turns')).toBe(1);

    expect(toAngle(360, 'deg', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(360, 'deg', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(360, 'deg', 'degrees')).toBe(360);
    expect(toAngle(360, 'deg', 'deg')).toBe(360);
    expect(toAngle(360, 'deg', 'gradians')).toBe(400);
    expect(toAngle(360, 'deg', 'grad')).toBe(400);
    expect(toAngle(360, 'deg', 'turns')).toBe(1);

    expect(toAngle(400, 'gradians', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(400, 'gradians', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(400, 'gradians', 'degrees')).toBe(360);
    expect(toAngle(400, 'gradians', 'deg')).toBe(360);
    expect(toAngle(400, 'gradians', 'gradians')).toBe(400);
    expect(toAngle(400, 'gradians', 'grad')).toBe(400);
    expect(toAngle(400, 'gradians', 'turns')).toBe(1);

    expect(toAngle(400, 'grad', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(400, 'grad', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(400, 'grad', 'degrees')).toBe(360);
    expect(toAngle(400, 'grad', 'deg')).toBe(360);
    expect(toAngle(400, 'grad', 'gradians')).toBe(400);
    expect(toAngle(400, 'grad', 'grad')).toBe(400);
    expect(toAngle(400, 'grad', 'turns')).toBe(1);

    expect(toAngle(1, 'turns', 'radians')).toBe(Math.PI * 2);
    expect(toAngle(1, 'turns', 'rad')).toBe(Math.PI * 2);
    expect(toAngle(1, 'turns', 'degrees')).toBe(360);
    expect(toAngle(1, 'turns', 'deg')).toBe(360);
    expect(toAngle(1, 'turns', 'gradians')).toBe(400);
    expect(toAngle(1, 'turns', 'grad')).toBe(400);
    expect(toAngle(1, 'turns', 'turns')).toBe(1);
  });
});
