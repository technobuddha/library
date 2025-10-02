import { randomWeightedPick } from '../random-weighted-pick.ts';

type Item = { name: string; weight: number };

describe('randomWeightedPick', () => {
  test('returns undefined for empty list', () => {
    expect(void randomWeightedPick([])).toBeUndefined();
  });

  test('returns the only item if list has one element', () => {
    const item = { name: 'a', weight: 10 };
    expect(randomWeightedPick([item])).toBe(item);
  });

  test('returns undefined if all weights are zero', () => {
    const items: Item[] = [
      { name: 'a', weight: 0 },
      { name: 'b', weight: 0 },
    ];
    expect(randomWeightedPick(items, { random: () => 0.5 })).toBeUndefined();
  });

  test('picks items according to weights', () => {
    const items: Item[] = [
      { name: 'a', weight: 1 },
      { name: 'b', weight: 3 },
    ];
    // Force random to 0.0 (should pick first item)
    expect(randomWeightedPick(items, { random: () => 0 })).toBe(items[0]);
    // Force random to just below 1 (should pick second item)
    expect(randomWeightedPick(items, { random: () => 0.99 })).toBe(items[1]);
    // Force random to 0.25 (should pick second item, since 0.25*4=1, cumulative 1 is first, 4 is second)
    expect(randomWeightedPick(items, { random: () => 0.3 })).toBe(items[1]);
  });

  test('handles items with missing or undefined weight as zero', () => {
    const items = [
      { name: 'a', weight: 0 },
      { name: 'b', weight: undefined as unknown as number },
      { name: 'c', weight: 2 },
    ];
    // Only 'c' has weight, so always picked
    expect(randomWeightedPick(items, { random: () => 0 })).toBe(items[2]);
    expect(randomWeightedPick(items, { random: () => 0.99 })).toBe(items[2]);
  });

  test('returns undefined if all weights are negative or zero', () => {
    const items = [
      { name: 'a', weight: -1 },
      { name: 'b', weight: 0 },
    ];
    expect(randomWeightedPick(items, { random: () => 0.5 })).toBeUndefined();
  });

  test('distribution matches weights (statistical)', () => {
    const items: Item[] = [
      { name: 'a', weight: 1 },
      { name: 'b', weight: 3 },
      { name: 'c', weight: 6 },
    ];
    const counts = { a: 0, b: 0, c: 0 };
    const N = 10000;
    for (let i = 0; i < N; ++i) {
      const picked = randomWeightedPick(items);
      if (picked) {
        counts[picked.name as keyof typeof counts]++;
      }
    }
    // Proportions should roughly match weights
    expect(counts.a / N).toBeCloseTo(0.1, 1);
    expect(counts.b / N).toBeCloseTo(0.3, 1);
    expect(counts.c / N).toBeCloseTo(0.6, 1);
  });

  test('works with custom random function', () => {
    const items: Item[] = [
      { name: 'a', weight: 2 },
      { name: 'b', weight: 2 },
    ];
    // Always pick first (random returns 0)
    expect(randomWeightedPick(items, { random: () => 0 })).toBe(items[0]);
    // Always pick second (random returns 0.99)
    expect(randomWeightedPick(items, { random: () => 0.99 })).toBe(items[1]);
  });
});
