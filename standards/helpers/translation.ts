export function translation(first: string, second: string): Record<string, string> {
  const index: Record<string, string> = {};

  const firstArray = first.split('');
  const secondArray = second.split('');

  if (firstArray.length !== secondArray.length) {
    throw new Error("talisman/helpers#translation: given strings don't have the same length.");
  }

  for (let i = 0, l = firstArray.length; i < l; i++) {
    index[firstArray[i]] = secondArray[i];
  }

  return index;
}
