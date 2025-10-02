import { Random } from '../random.ts';

// Concrete implementation for testing
class TestRandom extends Random {}

describe('Random', () => {
  describe('constructor', () => {
    test('should use Math.random by default', () => {
      const random = new TestRandom();
      expect(typeof random.random).toBe('function');
    });

    test('should use custom random function when provided', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      random.random();
      expect(mockRandom).toHaveBeenCalled();
    });

    test('should handle empty options object', () => {
      const random = new TestRandom({});
      expect(typeof random.random).toBe('function');
    });
  });

  describe('randomPick', () => {
    test('should return undefined for empty array', () => {
      const random = new TestRandom();
      expect(random.randomPick([])).toBeUndefined();
    });

    test('should return the only item from single-item array', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomPick(['only'])).toBe('only');
    });

    test('should pick first item when random returns 0', () => {
      const mockRandom = vi.fn(() => 0);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomPick(['first', 'second', 'third'])).toBe('first');
    });

    test('should pick last item when random returns close to 1', () => {
      const mockRandom = vi.fn(() => 0.999);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomPick(['first', 'second', 'third'])).toBe('third');
    });
  });

  describe('randomDraw', () => {
    test('should return undefined for empty array', () => {
      const random = new TestRandom();
      expect(random.randomDraw([])).toBeUndefined();
    });

    test('should return draw and remaining list for single item', () => {
      const mockRandom = vi.fn(() => 0);
      const random = new TestRandom({ random: mockRandom });

      const result = random.randomDraw(['only']);
      expect(result).toEqual({ draw: 'only', list: [] });
    });

    test('should remove drawn item from list', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      const result = random.randomDraw(['a', 'b', 'c']);
      expect(result?.list).toHaveLength(2);
      expect(result?.list).not.toContain(result?.draw);
    });
  });

  describe('randomWeightedPick', () => {
    test('should return undefined for empty array', () => {
      const random = new TestRandom();
      expect(random.randomWeightedPick([])).toBeUndefined();
    });

    test('should pick item based on weight distribution', () => {
      const mockRandom = vi.fn(() => 0.1);
      const random = new TestRandom({ random: mockRandom });

      const items = [
        { name: 'heavy', weight: 10 },
        { name: 'light', weight: 1 },
      ];

      const result = random.randomWeightedPick(items);
      expect(result?.name).toBe('heavy');
    });

    test('should handle single weighted item', () => {
      const random = new TestRandom();
      const items = [{ value: 'single', weight: 5 }];

      expect(random.randomWeightedPick(items)).toEqual({ value: 'single', weight: 5 });
    });
  });

  describe('randomShuffle', () => {
    test('should return empty array for empty input', () => {
      const random = new TestRandom();
      expect(random.randomShuffle([])).toEqual([]);
    });

    test('should return same single item', () => {
      const random = new TestRandom();
      expect(random.randomShuffle(['only'])).toEqual(['only']);
    });

    test('should not modify original array', () => {
      const random = new TestRandom();
      const original = [1, 2, 3, 4];
      const shuffled = random.randomShuffle(original);

      expect(original).toEqual([1, 2, 3, 4]);
      expect(shuffled).toHaveLength(4);
    });

    test('should contain all original elements', () => {
      const random = new TestRandom();
      const original = ['a', 'b', 'c', 'd'];
      const shuffled = random.randomShuffle(original);

      expect(shuffled).toIncludeSameMembers(original);
    });
  });

  describe('randomChance', () => {
    test('should return true when random value is less than probability', () => {
      const mockRandom = vi.fn(() => 0.3);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomChance(0.5)).toBeTrue();
    });

    test('should return false when random value is greater than probability', () => {
      const mockRandom = vi.fn(() => 0.8);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomChance(0.5)).toBeFalse();
    });

    test('should always return false for probability 0', () => {
      const random = new TestRandom();
      expect(random.randomChance(0)).toBeFalse();
    });

    test('should always return true for probability 1', () => {
      const mockRandom = vi.fn(() => 0.999);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomChance(1)).toBeTrue();
    });
  });

  describe('randomInteger', () => {
    test('should generate number within range', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      const result = random.randomInteger(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    test('should handle custom min value', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      const result = random.randomInteger(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(10);
    });

    test('should return integer values', () => {
      const random = new TestRandom();

      for (let i = 0; i < 100; i++) {
        const result = random.randomInteger(0, 10);
        expect(Number.isInteger(result)).toBeTrue();
      }
    });

    test('should handle edge case where random returns 0', () => {
      const mockRandom = vi.fn(() => 0);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomInteger(0, 10)).toBe(0);
      expect(random.randomInteger(5, 10)).toBe(5);
    });

    test('should handle edge case where random returns close to 1', () => {
      const mockRandom = vi.fn(() => 0.999);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomInteger(0, 10)).toBe(10);
      expect(random.randomInteger(5, 10)).toBe(10);
    });
  });

  describe('randomIndex', () => {
    test('should return undefined for empty array', () => {
      const random = new TestRandom();
      expect(random.randomIndex([])).toBeUndefined();
    });

    test('should return 0 for single-item array', () => {
      const random = new TestRandom();
      expect(random.randomIndex(['only'])).toBe(0);
    });

    test('should return first index when random returns 0', () => {
      const mockRandom = vi.fn(() => 0);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomIndex(['a', 'b', 'c'])).toBe(0);
    });

    test('should return last index when random returns close to 1', () => {
      const mockRandom = vi.fn(() => 0.999);
      const random = new TestRandom({ random: mockRandom });

      expect(random.randomIndex(['a', 'b', 'c'])).toBe(2);
    });

    test('should return valid index within array bounds', () => {
      const random = new TestRandom();
      const list = ['a', 'b', 'c', 'd', 'e'];
      const index = random.randomIndex(list);

      expect(index).toBeDefined();
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(list.length);
    });

    test('should use custom random function', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      random.randomIndex(['a', 'b', 'c']);
      expect(mockRandom).toHaveBeenCalled();
    });

    test('should return integer index', () => {
      const random = new TestRandom();
      const index = random.randomIndex([1, 2, 3, 4, 5]);

      expect(index).toBeDefined();
      expect(Number.isInteger(index)).toBeTrue();
    });

    test('should work with different array types', () => {
      const random = new TestRandom();

      const numberIndex = random.randomIndex([1, 2, 3]);
      expect(numberIndex).toBeGreaterThanOrEqual(0);
      expect(numberIndex).toBeLessThan(3);

      const objectIndex = random.randomIndex([{ id: 1 }, { id: 2 }]);
      expect(objectIndex).toBeGreaterThanOrEqual(0);
      expect(objectIndex).toBeLessThan(2);
    });

    test('should produce approximately uniform distribution', () => {
      const random = new TestRandom();
      const list = [0, 1, 2, 3, 4];
      const counts = [0, 0, 0, 0, 0];
      const trials = 5000;

      for (let i = 0; i < trials; i++) {
        const index = random.randomIndex(list);
        if (index !== undefined) {
          counts[index]++;
        }
      }

      const expectedCount = trials / list.length;
      for (const count of counts) {
        expect(count).toBeGreaterThan(expectedCount * 0.8);
        expect(count).toBeLessThan(expectedCount * 1.2);
      }
    });
  });

  describe('randomSample', () => {
    test('should return empty arrays for empty list', () => {
      const random = new TestRandom();
      const result = random.randomSample([], 5);

      expect(result.draw).toEqual([]);
      expect(result.list).toEqual([]);
    });

    test('should return empty arrays when sample size is 0', () => {
      const random = new TestRandom();
      const result = random.randomSample(['a', 'b', 'c'], 0);

      expect(result.draw).toEqual([]);
      expect(result.list).toEqual(['a', 'b', 'c']);
    });

    test('should sample single item correctly', () => {
      const mockRandom = vi.fn(() => 0);
      const random = new TestRandom({ random: mockRandom });
      const result = random.randomSample(['a', 'b', 'c'], 1);

      expect(result.draw).toHaveLength(1);
      expect(result.list).toHaveLength(2);
      expect([...result.draw, ...result.list]).toIncludeSameMembers(['a', 'b', 'c']);
    });

    test('should sample multiple items without replacement', () => {
      const random = new TestRandom();
      const items = ['a', 'b', 'c', 'd', 'e'];
      const result = random.randomSample(items, 3);

      expect(result.draw).toHaveLength(3);
      expect(result.list).toHaveLength(2);
      expect([...result.draw, ...result.list]).toIncludeSameMembers(items);

      // Check no duplicates in sample
      const uniqueSample = new Set(result.draw);
      expect(uniqueSample.size).toBe(3);
    });

    test('should sample all items when sample size equals list length', () => {
      const random = new TestRandom();
      const items = [1, 2, 3, 4];
      const result = random.randomSample(items, 4);

      expect(result.draw).toHaveLength(4);
      expect(result.list).toHaveLength(0);
      expect(result.draw).toIncludeSameMembers(items);
    });

    test('should sample all items when sample size exceeds list length', () => {
      const random = new TestRandom();
      const items = [1, 2, 3];
      const result = random.randomSample(items, 10);

      expect(result.draw).toHaveLength(3);
      expect(result.list).toHaveLength(0);
      expect(result.draw).toIncludeSameMembers(items);
    });

    test('should not modify original array', () => {
      const random = new TestRandom();
      const original = ['a', 'b', 'c', 'd'];
      const copy = [...original];

      random.randomSample(original, 2);

      expect(original).toEqual(copy);
    });

    test('should use custom random function', () => {
      const mockRandom = vi.fn(() => 0.5);
      const random = new TestRandom({ random: mockRandom });

      random.randomSample([1, 2, 3, 4, 5], 3);
      expect(mockRandom).toHaveBeenCalled();
    });

    test('should work with different data types', () => {
      const random = new TestRandom();

      // Numbers
      const numResult = random.randomSample([1, 2, 3], 2);
      expect(numResult.draw).toHaveLength(2);

      // Objects
      const objResult = random.randomSample([{ id: 1 }, { id: 2 }, { id: 3 }], 2);
      expect(objResult.draw).toHaveLength(2);

      // Mixed types
      const mixedResult = random.randomSample([1, 'two', { three: 3 }], 2);
      expect(mixedResult.draw).toHaveLength(2);
    });

    test('should return predictable results with fixed random', () => {
      let callCount = 0;
      const mockRandom = vi.fn(() => {
        // Return deterministic sequence: 0, 0.5, 0.99...
        const values = [0, 0.5, 0.999];
        return values[callCount++ % values.length];
      });
      const random = new TestRandom({ random: mockRandom });

      const result = random.randomSample(['a', 'b', 'c', 'd', 'e'], 3);

      expect(result.draw).toHaveLength(3);
      expect(result.list).toHaveLength(2);
    });

    test('should handle single-item list', () => {
      const random = new TestRandom();
      const result = random.randomSample(['only'], 1);

      expect(result.draw).toEqual(['only']);
      expect(result.list).toEqual([]);
    });

    test('should maintain item uniqueness across multiple samples', () => {
      const random = new TestRandom();
      const items = Array.from({ length: 20 }, (_, i) => i);
      const result = random.randomSample(items, 15);

      const uniqueDrawn = new Set(result.draw);
      const uniqueRemaining = new Set(result.list);

      expect(uniqueDrawn.size).toBe(15);
      expect(uniqueRemaining.size).toBe(5);

      // Check no overlap
      for (const item of result.draw) {
        expect(result.list).not.toContain(item);
      }
    });

    test('should produce different results on multiple calls', () => {
      const random = new TestRandom();
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const result1 = random.randomSample(items, 5);
      const result2 = random.randomSample(items, 5);

      // Very unlikely to get same order twice
      expect(result1.draw).not.toEqual(result2.draw);
    });
  });
});
