/**
 * Counts the frequency of each item in an array.
 *
 * Returns a Map where each key is a unique item from the input array and the value is the number of times it appears.
 *
 * @param items - The array of items to count frequencies for.
 * @returns A Map mapping each unique item to its frequency count.
 *
 * @example
 * ```typescript
 * frequency(['a', 'b', 'a', 'c', 'b', 'a']); // Map { 'a' => 3, 'b' => 2, 'c' => 1 }
 * frequency([1, 2, 2, 3]); // Map { 1 => 1, 2 => 2, 3 => 1 }
 * frequency([]); // Map {}
 * ```
 *
 * @group Math
 * @category Statistics
 */
export function frequency<T>(items: T[]): Map<T, number> {
  const frequencyMap = new Map<T, number>();
  for (const item of items) {
    frequencyMap.set(item, (frequencyMap.get(item) ?? 0) + 1);
  }
  return frequencyMap;
}
