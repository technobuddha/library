import { randomIndex } from '../random-index.ts';

const fixedRandom = (): number => 0.7;

describe('randomIndex', () => {
  test('should return undefined for empty array', () => {
    expect(randomIndex([])).toBeUndefined();
  });

  test('should return 0 for single element array', () => {
    expect(randomIndex(['a'])).toBe(0);
  });

  test('should return valid index for array', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const index = randomIndex(list);

    expect(index).toBeDefined();
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(list.length);
  });

  test('should return 0 when random returns 0.0', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    expect(randomIndex(list, { random: () => 0.0 })).toBe(0);
  });

  test('should return last index when random returns close to 1.0', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    expect(randomIndex(list, { random: () => 0.99 })).toBe(4);
  });

  test('should return middle index with middle random value', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const index = randomIndex(list, { random: () => 0.5 });

    expect(index).toBeDefined();
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(list.length);
  });

  test('should use provided random function', () => {
    const list = ['a', 'b', 'c'];
    let callCount = 0;
    const mockRandom = (): number => {
      callCount++;
      return 0.5;
    };

    randomIndex(list, { random: mockRandom });
    expect(callCount).toBeGreaterThan(0);
  });

  test('should work with different array sizes', () => {
    expect(randomIndex(['a'])).toBe(0);

    const twoItems = ['a', 'b'];
    const index2 = randomIndex(twoItems);
    expect(index2).toBeOneOf([0, 1]);

    const tenItems = Array.from({ length: 10 }, (_, i) => i);
    const index10 = randomIndex(tenItems);
    expect(index10).toBeGreaterThanOrEqual(0);
    expect(index10).toBeLessThan(10);
  });

  test('should work with arrays of different types', () => {
    const numbers = [1, 2, 3, 4, 5];
    const indexNum = randomIndex(numbers);
    expect(indexNum).toBeDefined();
    expect(indexNum).toBeGreaterThanOrEqual(0);
    expect(indexNum).toBeLessThan(numbers.length);

    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const indexObj = randomIndex(objects);
    expect(indexObj).toBeDefined();
    expect(indexObj).toBeGreaterThanOrEqual(0);
    expect(indexObj).toBeLessThan(objects.length);
  });

  test('should return valid index that can be used to access array', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const index = randomIndex(list);

    expect(index).toBeDefined();
    expect(list[index!]).toBeDefined();
    expect(list[index!]).toBeOneOf(['a', 'b', 'c', 'd', 'e']);
  });

  test('should produce approximately uniform distribution', () => {
    const list = [0, 1, 2, 3, 4];
    const counts = [0, 0, 0, 0, 0];
    const trials = 10000;

    for (let i = 0; i < trials; i++) {
      const index = randomIndex(list);
      if (index !== undefined) {
        counts[index]++;
      }
    }

    // Each index should appear approximately 20% of the time (within tolerance)
    const expectedCount = trials / list.length;
    for (const count of counts) {
      expect(count).toBeGreaterThan(expectedCount * 0.8);
      expect(count).toBeLessThan(expectedCount * 1.2);
    }
  });

  test('should return consistent results with fixed random function', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];

    const result1 = randomIndex(list, { random: fixedRandom });
    const result2 = randomIndex(list, { random: fixedRandom });

    expect(result1).toBe(result2);
  });

  test('should handle large arrays', () => {
    const largeList = Array.from({ length: 1000 }, (_, i) => i);
    const index = randomIndex(largeList);

    expect(index).toBeDefined();
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(largeList.length);
  });

  test('should return all possible indices over multiple calls', () => {
    const list = [0, 1, 2];
    const foundIndices = new Set<number>();

    // Try up to 100 times to find all indices
    for (let i = 0; i < 100; i++) {
      const index = randomIndex(list);
      if (index !== undefined) {
        foundIndices.add(index);
      }
      if (foundIndices.size === list.length) {
        break;
      }
    }

    expect(foundIndices.size).toBe(list.length);
    expect(foundIndices.has(0)).toBeTrue();
    expect(foundIndices.has(1)).toBeTrue();
    expect(foundIndices.has(2)).toBeTrue();
  });

  test('should work with array containing undefined values', () => {
    const list = [undefined, undefined, undefined];
    const index = randomIndex(list);

    expect(index).toBeDefined();
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(list.length);
  });

  test('should work with array containing null values', () => {
    const list = [null, null, null];
    const index = randomIndex(list);

    expect(index).toBeDefined();
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(list.length);
  });

  test('should return integer index', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const index = randomIndex(list);

    expect(index).toBeDefined();
    expect(Number.isSafeInteger(index)).toBeTrue();
  });

  test('should handle two-element array correctly', () => {
    const list = ['first', 'second'];

    const index1 = randomIndex(list, { random: () => 0.0 });
    const index2 = randomIndex(list, { random: () => 0.99 });

    expect(index1).toBe(0);
    expect(index2).toBe(1);
  });

  test('should never return negative index', () => {
    const list = ['a', 'b', 'c'];

    for (let i = 0; i < 100; i++) {
      const index = randomIndex(list);
      expect(index).toBeGreaterThanOrEqual(0);
    }
  });

  test('should never return index equal to or greater than length', () => {
    const list = ['a', 'b', 'c'];

    for (let i = 0; i < 100; i++) {
      const index = randomIndex(list);
      expect(index).toBeLessThan(list.length);
    }
  });
});
