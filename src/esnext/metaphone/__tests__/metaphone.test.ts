import { metaphone } from '../metaphone.ts';

describe('metaphone', () => {
  test('should return string for algorithm "1"', () => {
    const result = metaphone('Smith', '1');
    expect(typeof result).toBe('string');
    expect(result).toBe('SM0');
  });

  test('should return tuple for algorithm "2"', () => {
    const result = metaphone('Smith', '2');
    expect(result).toBeArray();
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('SM0');
    expect(result[1]).toBe('XMT');
  });

  test('should return tuple for algorithm "double"', () => {
    const result = metaphone('Smith', 'double');
    expect(result).toBeArray();
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('SM0');
    expect(result[1]).toBe('XMT');
  });

  test('should default to "double" algorithm', () => {
    const result = metaphone('Smith');
    expect(result).toBeArray();
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('SM0');
    expect(result[1]).toBe('XMT');
  });

  test('should handle different inputs', () => {
    expect(metaphone('Schmidt', '1')).toBe('SXMTT');
    expect(metaphone('Schmidt')).toEqual(['XMT', 'SMT']);
  });
});
