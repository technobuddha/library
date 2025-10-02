import { countOnes } from '../count-ones.ts';

describe('countOnes', () => {
  test('returns 0 for 0 (number)', () => {
    expect(countOnes(0)).toBe(0);
  });

  test('returns 0 for 0n (bigint)', () => {
    expect(countOnes(0n)).toBe(0);
  });

  test('counts ones in small numbers', () => {
    expect(countOnes(0b1011)).toBe(3);
    expect(countOnes(0b10000000)).toBe(1);
    expect(countOnes(0b11111111)).toBe(8);
  });

  test('counts ones in small bigints', () => {
    expect(countOnes(0b1011n)).toBe(3);
    expect(countOnes(0b10000000n)).toBe(1);
    expect(countOnes(0b11111111n)).toBe(8);
  });

  test('counts ones in large numbers', () => {
    expect(countOnes(1023)).toBe(10);
    expect(countOnes(255)).toBe(8);
    expect(countOnes(4294967295)).toBe(32);
  });

  test('counts ones in large bigints', () => {
    expect(countOnes(1023n)).toBe(10);
    expect(countOnes(255n)).toBe(8);
    expect(countOnes(4294967295n)).toBe(32);
  });

  test("counts ones in negative numbers (two's complement)", () => {
    // For negative numbers, result depends on JS representation
    expect(countOnes(-1)).toBe(32); // 32 bits all set
    expect(countOnes(-2)).toBe(31); // 31 bits set
  });

  test("counts ones in negative bigints (two's complement)", () => {
    // For negative bigints, result depends on infinite bits
    expect(countOnes(-1n)).toBe(Infinity); // Infinite bits set
  });

  test('returns 1 for powers of two', () => {
    expect(countOnes(1)).toBe(1);
    expect(countOnes(2)).toBe(1);
    expect(countOnes(4)).toBe(1);
    expect(countOnes(8)).toBe(1);
    expect(countOnes(16)).toBe(1);
  });

  test('returns correct for random values', () => {
    expect(countOnes(123456789)).toBe(16);
    expect(countOnes(987654321)).toBe(17);
  });
});
