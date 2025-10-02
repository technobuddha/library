import { randomChance } from '../random-chance.ts';

const fixedRandom = (): number => 0.3;

describe('randomChance', () => {
  test('should return true when probability is 1.0', () => {
    expect(randomChance(1.0)).toBeTrue();
  });

  test('should return false when probability is 0.0', () => {
    expect(randomChance(0.0)).toBeFalse();
  });

  test('should return true when random value is less than probability', () => {
    const result = randomChance(0.6, { random: () => 0.5 });
    expect(result).toBeTrue();
  });

  test('should return false when random value equals probability', () => {
    const result = randomChance(0.5, { random: () => 0.5 });
    expect(result).toBeFalse();
  });

  test('should return false when random value is greater than probability', () => {
    const result = randomChance(0.4, { random: () => 0.5 });
    expect(result).toBeFalse();
  });

  test('should work with probability 0.25', () => {
    expect(randomChance(0.25, { random: () => 0.2 })).toBeTrue();
    expect(randomChance(0.25, { random: () => 0.3 })).toBeFalse();
  });

  test('should work with probability 0.75', () => {
    expect(randomChance(0.75, { random: () => 0.5 })).toBeTrue();
    expect(randomChance(0.75, { random: () => 0.8 })).toBeFalse();
  });

  test('should use provided random function', () => {
    let callCount = 0;
    const mockRandom = (): number => {
      callCount++;
      return 0.5;
    };

    randomChance(0.6, { random: mockRandom });
    expect(callCount).toBe(1);
  });

  test('should call random function only once per invocation', () => {
    let callCount = 0;
    const mockRandom = (): number => {
      callCount++;
      return 0.5;
    };

    randomChance(0.7, { random: mockRandom });
    randomChance(0.7, { random: mockRandom });
    randomChance(0.7, { random: mockRandom });

    expect(callCount).toBe(3);
  });

  test('should use Math.random by default', () => {
    const result = randomChance(0.5);
    expect(typeof result).toBe('boolean');
  });

  test('should handle edge case with very small probability', () => {
    expect(randomChance(0.001, { random: () => 0.0 })).toBeTrue();
    expect(randomChance(0.001, { random: () => 0.002 })).toBeFalse();
  });

  test('should handle edge case with very high probability', () => {
    expect(randomChance(0.999, { random: () => 0.998 })).toBeTrue();
    expect(randomChance(0.999, { random: () => 0.999 })).toBeFalse();
  });

  test('should return consistent results with fixed random function', () => {
    expect(randomChance(0.5, { random: fixedRandom })).toBeTrue();
    expect(randomChance(0.5, { random: fixedRandom })).toBeTrue();
    expect(randomChance(0.2, { random: fixedRandom })).toBeFalse();
    expect(randomChance(0.2, { random: fixedRandom })).toBeFalse();
  });

  test('should work with boundary value at 0.0', () => {
    expect(randomChance(0.5, { random: () => 0.0 })).toBeTrue();
  });

  test('should work with boundary value close to 1.0', () => {
    expect(randomChance(1.0, { random: () => 0.999999 })).toBeTrue();
  });

  test('should handle negative probability as always false', () => {
    expect(randomChance(-0.5, { random: () => 0.5 })).toBeFalse();
    expect(randomChance(-1.0, { random: () => 0.0 })).toBeFalse();
  });

  test('should handle probability greater than 1.0', () => {
    expect(randomChance(1.5, { random: () => 0.5 })).toBeTrue();
    expect(randomChance(2.0, { random: () => 0.9 })).toBeTrue();
  });

  test('should produce approximately correct distribution over many trials', () => {
    const probability = 0.5;
    const trials = 10000;
    let trueCount = 0;

    for (let i = 0; i < trials; i++) {
      if (randomChance(probability)) {
        trueCount++;
      }
    }

    const actualProbability = trueCount / trials;
    // Should be within 5% of expected probability
    expect(actualProbability).toBeCloseTo(probability, 1);
  });

  test('should produce approximately 25% true for probability 0.25', () => {
    const probability = 0.25;
    const trials = 10000;
    let trueCount = 0;

    for (let i = 0; i < trials; i++) {
      if (randomChance(probability)) {
        trueCount++;
      }
    }

    const actualProbability = trueCount / trials;
    expect(actualProbability).toBeCloseTo(probability, 1);
  });

  test('should produce approximately 75% true for probability 0.75', () => {
    const probability = 0.75;
    const trials = 10000;
    let trueCount = 0;

    for (let i = 0; i < trials; i++) {
      if (randomChance(probability)) {
        trueCount++;
      }
    }

    const actualProbability = trueCount / trials;
    expect(actualProbability).toBeCloseTo(probability, 1);
  });

  test('should work with incrementing random values', () => {
    let value = 0.0;
    const incrementingRandom = (): number => {
      const result = value;
      value += 0.1;
      return result;
    };

    expect(randomChance(0.5, { random: incrementingRandom })).toBeTrue(); // 0.0 < 0.5
    expect(randomChance(0.5, { random: incrementingRandom })).toBeTrue(); // 0.1 < 0.5
    expect(randomChance(0.5, { random: incrementingRandom })).toBeTrue(); // 0.2 < 0.5
    expect(randomChance(0.5, { random: incrementingRandom })).toBeTrue(); // 0.3 < 0.5
    expect(randomChance(0.5, { random: incrementingRandom })).toBeTrue(); // 0.4 < 0.5
    expect(randomChance(0.5, { random: incrementingRandom })).toBeFalse(); // 0.5 >= 0.5
    expect(randomChance(0.5, { random: incrementingRandom })).toBeFalse(); // 0.6 >= 0.5
  });
});
