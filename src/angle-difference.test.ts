import { angleDifference } from './angle-difference.ts';

describe('angleDifference', () => {
  test('should compute positive angles', () => {
    expect(angleDifference((0 * Math.PI) / 4, 0)).toBe(0);
    expect(angleDifference((0 * Math.PI) / 4, Math.PI / 4)).toBe(Math.PI / 4);
    expect(angleDifference((0 * Math.PI) / 4, (2 * Math.PI) / 4)).toBe((2 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (3 * Math.PI) / 4)).toBe((3 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (4 * Math.PI) / 4)).toBe((4 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (5 * Math.PI) / 4)).toBe((-3 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (6 * Math.PI) / 4)).toBe((-2 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (7 * Math.PI) / 4)).toBe((-1 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (8 * Math.PI) / 4)).toBe(0);
  });

  test('should compute negative angles', () => {
    expect(angleDifference((0 * Math.PI) / 4, 0)).toBe(0);
    expect(angleDifference((0 * Math.PI) / 4, (-1 * Math.PI) / 4)).toBe((-1 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-2 * Math.PI) / 4)).toBe((-2 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-3 * Math.PI) / 4)).toBe((-3 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-4 * Math.PI) / 4)).toBe((4 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-5 * Math.PI) / 4)).toBe((3 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-6 * Math.PI) / 4)).toBe((2 * Math.PI) / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-7 * Math.PI) / 4)).toBe(Math.PI / 4);
    expect(angleDifference((0 * Math.PI) / 4, (-8 * Math.PI) / 4)).toBe(0);
  });

  test('should convert units', () => {
    // expect(angleDifference(0, 0, 'degrees')).toBe(0);
    expect(angleDifference(0, -45, 'degrees')).toBe(-45);
    expect(angleDifference(0, -90, 'degrees')).toBe(-90);
    expect(angleDifference(0, -135, 'degrees')).toBe(-135);
    expect(angleDifference(0, -180, 'degrees')).toBe(180);
    expect(angleDifference(0, -225, 'degrees')).toBe(135);
    expect(angleDifference(0, -270, 'degrees')).toBe(90);
    expect(angleDifference(0, -315, 'degrees')).toBe(45);
    expect(angleDifference(0, -360, 'degrees')).toBe(0);
  });
});
