import { jaroDistance } from '../jaro-distance.ts';

describe('jaroDistance', () => {
  test('returns 1 for identical strings', () => {
    expect(jaroDistance('hello', 'hello')).toBe(1);
  });

  test('returns 0 for completely different strings', () => {
    expect(jaroDistance('abc', 'xyz')).toBe(0);
  });

  test('calculates Jaro distance for similar strings', () => {
    expect(jaroDistance('MARTHA', 'MARHTA')).toBeCloseTo(0.944444);
    expect(jaroDistance('DWAYNE', 'DUANE')).toBeCloseTo(0.822222);
    expect(jaroDistance('DIXON', 'DICKSONX')).toBeCloseTo(0.766666);
  });

  test('handles case-insensitive comparison by default', () => {
    expect(jaroDistance('Hello', 'hello')).toBe(1);
  });

  test('handles case-sensitive comparison when enabled', () => {
    expect(jaroDistance('Hello', 'hello', { caseSensitive: true })).toBeCloseTo(0.866666);
  });

  test('returns 0 when one or both strings are empty', () => {
    expect(jaroDistance('', 'hello')).toBe(0);
    expect(jaroDistance('hello', '')).toBe(0);
    expect(jaroDistance('', '')).toBe(0);
  });
});
