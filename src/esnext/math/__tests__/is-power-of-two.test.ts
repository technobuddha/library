import { isPowerOfTwo } from '../is-power-of-two.ts';

describe('isPowerOfTwo', () => {
  test('should return true for powers of two', () => {
    expect(isPowerOfTwo(1)).toBeTrue(); // 2^0
    expect(isPowerOfTwo(2)).toBeTrue(); // 2^1
    expect(isPowerOfTwo(4)).toBeTrue(); // 2^2
    expect(isPowerOfTwo(8)).toBeTrue(); // 2^3
    expect(isPowerOfTwo(16)).toBeTrue(); // 2^4
    expect(isPowerOfTwo(32)).toBeTrue(); // 2^5
    expect(isPowerOfTwo(64)).toBeTrue(); // 2^6
    expect(isPowerOfTwo(128)).toBeTrue(); // 2^7
    expect(isPowerOfTwo(256)).toBeTrue(); // 2^8
    expect(isPowerOfTwo(512)).toBeTrue(); // 2^9
    expect(isPowerOfTwo(1024)).toBeTrue(); // 2^10
  });

  test('should return false for non-powers of two', () => {
    expect(isPowerOfTwo(3)).toBeFalse();
    expect(isPowerOfTwo(5)).toBeFalse();
    expect(isPowerOfTwo(6)).toBeFalse();
    expect(isPowerOfTwo(7)).toBeFalse();
    expect(isPowerOfTwo(9)).toBeFalse();
    expect(isPowerOfTwo(10)).toBeFalse();
    expect(isPowerOfTwo(12)).toBeFalse();
    expect(isPowerOfTwo(15)).toBeFalse();
    expect(isPowerOfTwo(18)).toBeFalse();
    expect(isPowerOfTwo(100)).toBeFalse();
  });

  test('should return false for zero and negative numbers', () => {
    expect(isPowerOfTwo(0)).toBeFalse();
    expect(isPowerOfTwo(-1)).toBeFalse();
    expect(isPowerOfTwo(-2)).toBeFalse();
    expect(isPowerOfTwo(-4)).toBeFalse();
    expect(isPowerOfTwo(-8)).toBeFalse();
    expect(isPowerOfTwo(-16)).toBeFalse();
  });

  test('should return false for decimal numbers', () => {
    expect(isPowerOfTwo(1.5)).toBeFalse();
    expect(isPowerOfTwo(2.1)).toBeFalse();
    expect(isPowerOfTwo(3.14)).toBeFalse();
    expect(isPowerOfTwo(7.99)).toBeFalse();
    expect(isPowerOfTwo(8.01)).toBeFalse();
  });

  test('should handle large powers of two', () => {
    expect(isPowerOfTwo(2048)).toBeTrue(); // 2^11
    expect(isPowerOfTwo(4096)).toBeTrue(); // 2^12
    expect(isPowerOfTwo(8192)).toBeTrue(); // 2^13
    expect(isPowerOfTwo(16384)).toBeTrue(); // 2^14
    expect(isPowerOfTwo(32768)).toBeTrue(); // 2^15
    expect(isPowerOfTwo(65536)).toBeTrue(); // 2^16
    expect(isPowerOfTwo(1048576)).toBeTrue(); // 2^20
  });

  test('should return false for numbers just off powers of two', () => {
    expect(isPowerOfTwo(15)).toBeFalse(); // 16 - 1
    expect(isPowerOfTwo(17)).toBeFalse(); // 16 + 1
    expect(isPowerOfTwo(31)).toBeFalse(); // 32 - 1
    expect(isPowerOfTwo(33)).toBeFalse(); // 32 + 1
    expect(isPowerOfTwo(63)).toBeFalse(); // 64 - 1
    expect(isPowerOfTwo(65)).toBeFalse(); // 64 + 1
  });
});
