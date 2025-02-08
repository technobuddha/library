/**
 * Returns the mode (the most frequently occurring element) of the given array.
 * If multiple elements have the same highest frequency, the first encountered is returned.
 * Returns `undefined` if the array is empty.
 *
 * @typeParam T - The type of elements in the input array.
 * @param array - The array of elements to find the mode of.
 * @returns The mode of the array, or `undefined` if the array is empty.
 * @group Math
 * @category Statistics
 */
export function mode<T>(array: T[]): T | undefined {
  if (array.length > 0) {
    const frequencyMap = new Map<T, number>();
    for (const item of array) {
      frequencyMap.set(item, (frequencyMap.get(item) ?? 0) + 1);
    }

    let maxCount = 0;
    let modeItem: T | undefined;

    for (const [item, count] of frequencyMap) {
      if (count > maxCount) {
        maxCount = count;
        modeItem = item;
      }
    }

    return modeItem;
  }
  return undefined;
}
