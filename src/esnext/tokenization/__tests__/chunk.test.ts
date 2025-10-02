// Unit tests for chunk in tokenization
import { chunk } from '../chunk.ts';

describe('chunk', () => {
  test('chunks string into substrings', () => {
    const result = Array.from(chunk('abcdef', 2));
    expect(result).toEqual(['ab', 'cd', 'ef']);
  });

  test('chunks string with truncate', () => {
    const result = Array.from(chunk('abcde', 2, { truncate: true }));
    expect(result).toEqual(['ab', 'cd']);
  });

  test('chunks array into arrays', () => {
    const result = Array.from(chunk([1, 2, 3, 4, 5], 2));
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('chunks array with truncate', () => {
    const result = Array.from(chunk([1, 2, 3, 4, 5], 2, { truncate: true }));
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('throws on non-positive size', () => {
    expect(() => Array.from(chunk([1, 2, 3], 0))).toThrow(TypeError);
    expect(() => Array.from(chunk('abc', -1))).toThrow(TypeError);
  });

  test('empty string yields nothing', () => {
    const result = Array.from(chunk('', 2));
    expect(result).toEqual([]);
  });

  test('empty array yields nothing', () => {
    const result = Array.from(chunk([], 2));
    expect(result).toEqual([]);
  });

  test('single element string', () => {
    const result = Array.from(chunk('a', 2));
    expect(result).toEqual(['a']);
  });

  test('single element array', () => {
    const result = Array.from(chunk([1], 2));
    expect(result).toEqual([[1]]);
  });
});
