import { angleDifference } from '../angle-difference.ts';

describe('angleDifference', () => {
  test('should compute positive angles', () => {
    expect(angleDifference((0 * Math.PI) / 4, (0 * Math.PI) / 4)).toBe(0);
    expect(angleDifference((2 * Math.PI) / 4, (2 * Math.PI) / 4)).toBe(0);
    expect(angleDifference((0 * Math.PI) / 4, (2 * Math.PI) / 4)).toBe((2 * Math.PI) / 4);
    expect(angleDifference((2 * Math.PI) / 4, (4 * Math.PI) / 4)).toBe((2 * Math.PI) / 4);
  });

  test('should compute negative angles', () => {
    expect(angleDifference((0 * Math.PI) / 4, (7 * Math.PI) / 4)).toBe((-1 * Math.PI) / 4);
    expect(angleDifference((2 * Math.PI) / 4, (0 * Math.PI) / 4)).toBe((-2 * Math.PI) / 4);
    expect(angleDifference((4 * Math.PI) / 4, (2 * Math.PI) / 4)).toBe((-2 * Math.PI) / 4);
  });

  test('should convert units', () => {
    expect(angleDifference(0, 0, { unit: 'degrees' })).toBe(0);
    expect(angleDifference(0, 315, { unit: 'degrees' })).toBe(-45);
    expect(angleDifference(0, -315, { unit: 'degrees' })).toBe(45);
  });
});
