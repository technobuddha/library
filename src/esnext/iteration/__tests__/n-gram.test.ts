import { bigrams, nGrams, quadrigrams, trigrams } from '../n-gram.ts';

describe('nGrams', () => {
  test('should generate bigrams from string', () => {
    expect(nGrams(2, 'abcd')).toEqual(['ab', 'bc', 'cd']);
    expect(bigrams('abcd')).toEqual(['ab', 'bc', 'cd']);
  });

  test('should generate trigrams from string', () => {
    expect(nGrams(3, 'abcd')).toEqual(['abc', 'bcd']);
    expect(trigrams('abcd')).toEqual(['abc', 'bcd']);
  });

  test('should generate quadrigrams from string', () => {
    expect(nGrams(4, 'abcde')).toEqual(['abcd', 'bcde']);
    expect(quadrigrams('abcde')).toEqual(['abcd', 'bcde']);
  });

  test('should generate bigrams from array', () => {
    expect(nGrams(2, [1, 2, 3, 4])).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
    expect(bigrams([1, 2, 3, 4])).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
  });

  test('should generate trigrams from array', () => {
    expect(nGrams(3, [1, 2, 3, 4])).toEqual([
      [1, 2, 3],
      [2, 3, 4],
    ]);
    expect(trigrams([1, 2, 3, 4])).toEqual([
      [1, 2, 3],
      [2, 3, 4],
    ]);
  });

  test('should throw for n < 1', () => {
    expect(() => nGrams(0, 'abc')).toThrow();
    expect(() => nGrams(-1, [1, 2, 3])).toThrow();
  });

  test('should return empty for short input', () => {
    expect(nGrams(5, 'abc')).toEqual([]);
    expect(nGrams(5, [1, 2, 3])).toEqual([]);
  });
});
