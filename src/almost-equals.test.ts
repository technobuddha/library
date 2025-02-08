import { almostEquals } from './almost-equals.js';

describe('almostEquals', () => {
  test('should handle numbers within EPSILON distance', () => {
    expect(almostEquals(1, 1 + Number(Number.EPSILON))).toBeTrue();
    expect(almostEquals(1, 1 - Number(Number.EPSILON))).toBeTrue();
    expect(almostEquals(1, 1 + Number.EPSILON * 2)).toBeFalse();
    expect(almostEquals(1, 1 - Number.EPSILON * 2)).toBeFalse();
  });

  test('should allow specification of tolerance', () => {
    expect(almostEquals(1, 1.001, { tolerance: 0.001 })).toBeTrue();
    expect(almostEquals(1, 0.999, { tolerance: 0.001 })).toBeTrue();
    expect(almostEquals(1, 1.002, { tolerance: 0.001 })).toBeFalse();
    expect(almostEquals(1, 0.998, { tolerance: 0.001 })).toBeFalse();
  });
});
