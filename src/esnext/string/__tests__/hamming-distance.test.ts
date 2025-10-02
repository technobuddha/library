import { hammingDistance } from '../hamming-distance.ts';

describe('hammingDistance', () => {
  test('string: identical', () => {
    expect(hammingDistance('karolin', 'karolin')).toBe(0);
  });

  test('string: typical cases', () => {
    expect(hammingDistance('karolin', 'kathrin')).toBe(3);
    expect(hammingDistance('karolin', 'kerstin')).toBe(3);
    expect(hammingDistance('1011101', '1001001')).toBe(2);
  });

  test('string: different lengths', () => {
    expect(hammingDistance('abc', 'abcd')).toBe(1);
    expect(hammingDistance('abcd', 'abc')).toBe(1);
  });

  test('number: bitwise', () => {
    expect(hammingDistance(101, 105)).toBe(2); // 101 ^ 105 = 12, 0b1100, two bits set
    expect(hammingDistance(0b1011101, 0b1001001)).toBe(2);
    expect(hammingDistance(0, 0)).toBe(0);
  });

  test('array: identical', () => {
    expect(hammingDistance([1, 2, 3], [1, 2, 3])).toBe(0);
  });

  test('array: typical', () => {
    expect(hammingDistance([1, 2, 3], [1, 2, 4])).toBe(1);
    expect(hammingDistance([1, 2, 3], [4, 5, 6])).toBe(3);
  });

  test('array: different lengths', () => {
    expect(hammingDistance([1, 2], [1, 2, 3])).toBe(1);
    expect(hammingDistance([1, 2, 3], [1, 2])).toBe(1);
  });

  test('edge cases', () => {
    expect(hammingDistance('', '')).toBe(0);
    expect(hammingDistance([], [])).toBe(0);
    expect(hammingDistance('', 'a')).toBe(1);
    expect(hammingDistance('a', '')).toBe(1);
    expect(hammingDistance([], [1])).toBe(1);
    expect(hammingDistance([1], [])).toBe(1);
  });
});
