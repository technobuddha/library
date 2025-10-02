import { create1dArray } from '../create1d-array.ts';

describe('create1dArray', () => {
  test('should create an array of specified length filled with a static value', () => {
    const result = create1dArray(5, 42);
    expect(result).toEqual([42, 42, 42, 42, 42]);
  });

  test('should create an array of specified length filled with values from a function', () => {
    const result = create1dArray(4, (i) => i * 2);
    expect(result).toEqual([0, 2, 4, 6]);
  });

  test('should handle length 0 and return an empty array', () => {
    const result = create1dArray(0, 99);
    expect(result).toEqual([]);
  });

  test('should work with string fill value', () => {
    const result = create1dArray(3, 'a');
    expect(result).toEqual(['a', 'a', 'a']);
  });

  test('should work with function returning strings', () => {
    const result = create1dArray(3, (i) => `item${i}`);
    expect(result).toEqual(['item0', 'item1', 'item2']);
  });

  test('should work with boolean fill value', () => {
    const result = create1dArray(2, false);
    expect(result).toEqual([false, false]);
  });

  test('should work with function returning booleans', () => {
    const result = create1dArray(2, (i) => i % 2 === 0);
    expect(result).toEqual([true, false]);
  });
});
