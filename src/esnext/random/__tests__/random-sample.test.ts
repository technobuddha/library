import { randomSample } from '../random-sample.ts';

const fixedRandom = (): number => 0.3;

describe('randomSample', () => {
  test('should deal requested number of items from list', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const result = randomSample(list, 3, { random: () => 0.5 });

    expect(result).toBeDefined();
    expect(result.draw).toHaveLength(3);
    expect(result.list).toHaveLength(2);
    expect(result.draw.length + result.list.length).toBe(5);
  });

  test('should return undefined for empty list', () => {
    const result = randomSample([], 5);
    expect(result.draw).toHaveLength(0);
    expect(result.list).toHaveLength(0);
  });

  test('should return undefined when count is 0', () => {
    const list = ['A', 'B', 'C'];
    const result = randomSample(list, 0);
    expect(result.draw).toHaveLength(0);
    expect(result.list).toHaveLength(3);
  });

  test('should deal all items when count exceeds list length', () => {
    const list = ['A', 'B', 'C'];
    const result = randomSample(list, 10);

    expect(result).toBeDefined();
    expect(result.draw).toHaveLength(3);
    expect(result.list).toHaveLength(0);
  });

  test('should deal exactly the list length when count equals list length', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const result = randomSample(list, 5);

    expect(result).toBeDefined();
    expect(result.draw).toHaveLength(5);
    expect(result.list).toHaveLength(0);
  });

  test('should deal single item when count is 1', () => {
    const list = ['A', 'B', 'C'];
    const result = randomSample(list, 1, { random: () => 0.5 });

    expect(result).toBeDefined();
    expect(result.draw).toHaveLength(1);
    expect(result.list).toHaveLength(2);
  });

  test('should not modify original list', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const original = [...list];

    randomSample(list, 3);

    expect(list).toEqual(original);
  });

  test('should deal items that were in original list', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const result = randomSample(list, 3);

    expect(result).toBeDefined();
    for (const item of result.draw) {
      expect(list).toContain(item);
    }
  });

  test('should have no overlap between dealt items and remaining list', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = randomSample(list, 5);

    expect(result).toBeDefined();

    const dealtSet = new Set(result.draw);
    const remainingSet = new Set(result.list);

    for (const item of result.draw) {
      expect(remainingSet.has(item)).toBeFalse();
    }

    for (const item of result.list) {
      expect(dealtSet.has(item)).toBeFalse();
    }
  });

  test('should use provided random function', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    let callCount = 0;
    const mockRandom = (): number => {
      callCount++;
      return 0.5;
    };

    const result = randomSample(list, 3, { random: mockRandom });

    expect(result).toBeDefined();
    expect(callCount).toBeGreaterThan(0);
  });

  test('should deal different items with different random values', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];

    // Always select first item
    const result1 = randomSample(list, 2, { random: () => 0.0 });

    // Always select middle item
    const result2 = randomSample(list, 2, { random: () => 0.5 });

    expect(result1).toBeDefined();
    expect(result2).toBeDefined();

    // Results should be different (with high probability)
    expect(result1.draw).not.toEqual(result2.draw);
  });

  test('should work with different data types', () => {
    const numbers = [1, 2, 3, 4, 5];
    const resultNumbers = randomSample(numbers, 2);
    expect(resultNumbers).toBeDefined();
    expect(resultNumbers.draw).toHaveLength(2);

    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const resultObjects = randomSample(objects, 2);
    expect(resultObjects).toBeDefined();
    expect(resultObjects.draw).toHaveLength(2);
  });

  test('should handle single item list', () => {
    const list = ['A'];
    const result = randomSample(list, 1);

    expect(result).toBeDefined();
    expect(result.draw).toEqual(['A']);
    expect(result.list).toEqual([]);
  });

  test('should return undefined when dealing from single item list with count 0', () => {
    const list = ['A'];
    const result = randomSample(list, 0);
    expect(result.draw).toHaveLength(0);
    expect(result.list).toHaveLength(1);
  });

  test('should deal deterministically with fixed random function', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];

    const result1 = randomSample(list, 3, { random: fixedRandom });
    const result2 = randomSample(list, 3, { random: fixedRandom });

    expect(result1).toEqual(result2);
  });

  test('should combine dealt items and remaining list to original list content', () => {
    const list = [10, 20, 30, 40, 50];
    const result = randomSample(list, 3);

    expect(result).toBeDefined();

    const combined = [...result.draw, ...result.list].sort((a, b) => a - b);
    const original = [...list].sort((a, b) => a - b);

    expect(combined).toEqual(original);
  });

  test('should handle negative count as dealing zero items', () => {
    const list = ['A', 'B', 'C'];
    const result = randomSample(list, -5);
    expect(result.draw).toHaveLength(0);
    expect(result.list).toHaveLength(3);
  });

  test('should work with readonly array', () => {
    const list: readonly string[] = ['A', 'B', 'C', 'D', 'E'];
    const result = randomSample(list, 2);

    expect(result).toBeDefined();
    expect(result.draw).toHaveLength(2);
    expect(result.list).toHaveLength(3);
  });
});
