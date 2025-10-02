import { jaroWinklerDistance } from '../jaro-winkler-distance.ts';

describe('jaroWinklerDistance', () => {
  test('returns 1 for identical strings', () => {
    expect(jaroWinklerDistance('hello', 'hello')).toBe(1);
  });

  test('returns 0 for completely different strings', () => {
    expect(jaroWinklerDistance('abc', 'xyz')).toBe(0);
  });

  test('calculates Jaro-Winkler distance for similar strings', () => {
    expect(jaroWinklerDistance('MARTHA', 'MARHTA')).toBeCloseTo(0.961111, 6);
    expect(jaroWinklerDistance('DWAYNE', 'DUANE')).toBeCloseTo(0.84, 6);
    expect(jaroWinklerDistance('DIXON', 'DICKSONX')).toBeCloseTo(0.813333, 6);
  });

  test('handles case-insensitive comparison by default', () => {
    expect(jaroWinklerDistance('Hello', 'hello')).toBe(1);
  });

  test('handles case-sensitive comparison when enabled', () => {
    expect(jaroWinklerDistance('Hello', 'hello', { caseSensitive: true })).toBeCloseTo(
      0.8666666666666667,
      6,
    );
  });

  test('returns 0 when one or both strings are empty', () => {
    expect(jaroWinklerDistance('', 'hello')).toBe(0);
    expect(jaroWinklerDistance('hello', '')).toBe(0);
    expect(jaroWinklerDistance('', '')).toBe(0);
  });
});
