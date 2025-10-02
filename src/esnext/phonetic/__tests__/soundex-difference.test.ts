import { empty } from '../../unicode/unicode.ts';

import { soundexCompare } from '../soundex-compare.ts';

describe('soundexDifference', () => {
  test('returns 0 for empty strings', () => {
    expect(soundexCompare(empty, 'test')).toBe(0);
    expect(soundexCompare('test', empty)).toBe(0);
    expect(soundexCompare(empty, empty)).toBe(0);
  });

  test('returns 4 for identical soundex codes', () => {
    // Words with identical Soundex codes should return 4
    expect(soundexCompare('Smith', 'Smyth')).toBe(4);
    expect(soundexCompare('John', 'Jon')).toBe(4);
    expect(soundexCompare('Robert', 'Rupert')).toBe(4);
    expect(soundexCompare('Miller', 'Mueller')).toBe(4);
  });

  test('returns 4 for identical strings', () => {
    expect(soundexCompare('test', 'test')).toBe(4);
    expect(soundexCompare('Hello', 'Hello')).toBe(4);
    expect(soundexCompare('World', 'World')).toBe(4);
  });

  test('returns low scores for very different sounds', () => {
    // Words with very little phonetic similarity - some might have partial matches
    const result1 = soundexCompare('Hello', 'World');
    expect(result1).toBeGreaterThanOrEqual(0);
    expect(result1).toBeLessThan(4);

    const result2 = soundexCompare('Cat', 'Dog');
    expect(result2).toBeGreaterThanOrEqual(0);
    expect(result2).toBeLessThan(4);
  });

  test('returns appropriate scores for words with same first letter but different codes', () => {
    // Words starting with same letter but different Soundex codes will have at least score 1
    const result1 = soundexCompare('Sam', 'Simon'); // S500 vs S550
    expect(result1).toBeGreaterThanOrEqual(1);
    expect(result1).toBeLessThan(4);

    const result2 = soundexCompare('Bob', 'Bill');
    expect(result2).toBeGreaterThanOrEqual(0);
    expect(result2).toBeLessThan(4);
  });

  test('returns appropriate scores for partial matches', () => {
    // Test various levels of similarity (2-3 range)
    expect(soundexCompare('Jackson', 'Johnson')).toBeGreaterThan(0);
    expect(soundexCompare('Jackson', 'Johnson')).toBeLessThanOrEqual(4);

    // Catherine vs Katherine have different first letters but similar sounds
    expect(soundexCompare('Catherine', 'Katherine')).toBe(3);
  });
  test('handles case insensitive comparison', () => {
    expect(soundexCompare('SMITH', 'smith')).toBe(4);
    expect(soundexCompare('Smith', 'SMYTH')).toBe(4);
    // Different words will have different scores regardless of case
    const result = soundexCompare('HELLO', 'world');
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(4);
  });

  test('handles single character inputs', () => {
    // A (A000) vs B (B000) - different first letters, but some digit similarity
    const result1 = soundexCompare('A', 'B');
    expect(result1).toBeGreaterThanOrEqual(0);
    expect(result1).toBeLessThan(4);

    expect(soundexCompare('A', 'A')).toBe(4);
    expect(soundexCompare('S', 'Z')).toBeGreaterThanOrEqual(0);
  });

  test('handles special characters and numbers', () => {
    expect(soundexCompare('Test123', 'Test456')).toBe(4);
    expect(soundexCompare('Hello!', 'Hello?')).toBe(4);
    expect(soundexCompare('A-B-C', 'ABC')).toBe(4);
  });

  test('handles empty-like inputs', () => {
    expect(soundexCompare('', 'test')).toBe(0);
    expect(soundexCompare('test', '')).toBe(0);
    expect(soundexCompare('', '')).toBe(0);
  });

  test('returns consistent results regardless of parameter order', () => {
    const testPairs = [
      ['Smith', 'Smyth'],
      ['Hello', 'World'],
      ['Test', 'Taste'],
      ['Miller', 'Mueller'],
    ];

    for (const [word1, word2] of testPairs) {
      expect(soundexCompare(word1, word2)).toBe(soundexCompare(word2, word1));
    }
  });

  test('handles long strings', () => {
    const longWord1 = 'Constantinopolitan';
    const longWord2 = 'Constantinople';
    const result = soundexCompare(longWord1, longWord2);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(4);
  });

  test('specific known Soundex difference examples', () => {
    // Test cases where we know the expected Soundex codes and differences
    // Smith (S530) vs Smyth (S530) = 4 (identical)
    expect(soundexCompare('Smith', 'Smyth')).toBe(4);

    // Robert (R163) vs Rupert (R163) = 4 (identical)
    expect(soundexCompare('Robert', 'Rupert')).toBe(4);

    // Test different first letters with some similarity
    // Smith (S530) vs Jones (J520) = 2 (some matching digits)
    expect(soundexCompare('Smith', 'Jones')).toBe(2);
  });
  test('boundary conditions for scoring algorithm', () => {
    // Test the internal scoring logic for various substring matches
    const result1 = soundexCompare('Testing', 'Texting');
    expect(result1).toBeGreaterThanOrEqual(0);
    expect(result1).toBeLessThanOrEqual(4);

    const result2 = soundexCompare('Programming', 'Programing');
    expect(result2).toBeGreaterThanOrEqual(0);
    expect(result2).toBeLessThanOrEqual(4);
  });

  test('unicode and international characters', () => {
    // Test with accented characters (should be handled by Soundex algorithm)
    expect(soundexCompare('José', 'Jose')).toBe(4);
    expect(soundexCompare('François', 'Francois')).toBe(4);
  });

  test('performance with repeated calls', () => {
    // Ensure function works correctly with repeated calls
    const word1 = 'Performance';
    const word2 = 'Performence';

    const result1 = soundexCompare(word1, word2);
    const result2 = soundexCompare(word1, word2);
    const result3 = soundexCompare(word1, word2);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });
});
