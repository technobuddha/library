import { approximatelyEquals } from './approximately-equals.ts';

describe('approximatelyEquals', () => {
  test('should handle numbers within EPSILON distance', () => {
    expect(approximatelyEquals(1, 1 + Number.EPSILON)).toBeTrue();
    expect(approximatelyEquals(1, 1 - Number.EPSILON)).toBeTrue();
    expect(approximatelyEquals(1, 1 + Number.EPSILON * 2)).toBeFalse();
    expect(approximatelyEquals(1, 1 - Number.EPSILON * 2)).toBeFalse();
  });

  test('should allow specification of tolerance', () => {
    expect(approximatelyEquals(1, 1.001, { tolerance: 0.001 })).toBeTrue();
    expect(approximatelyEquals(1, 0.999, { tolerance: 0.001 })).toBeTrue();
    expect(approximatelyEquals(1, 1.002, { tolerance: 0.001 })).toBeFalse();
    expect(approximatelyEquals(1, 0.998, { tolerance: 0.001 })).toBeFalse();
  });
});
