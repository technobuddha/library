import { build } from '../string/build.ts';
import { hyphen, nonBreakingHyphen } from '../unicode/unicode.ts';

const reIsWord = new RegExp(`^[\\p{L}\\-${hyphen}${nonBreakingHyphen}]+$`, 'v');
const reWords = new RegExp(`([^\\p{L}\\-${hyphen}${nonBreakingHyphen}]+)`, 'v');
const reFirstLetters = new RegExp(`(?:^|[\\-${hyphen}${nonBreakingHyphen}])[\\p{L}]`, 'vg');

/**
 * Capitalize the first letter in a word.
 * @param input - The word to capitalize
 * @group Case Conversion
 * @category Capitalization
 */
export function capitalize(input: string): string {
  const words = input.split(reWords);
  const result: string[] = [];
  let found = false;

  for (const word of words) {
    if (!found && reIsWord.test(word)) {
      found = true;
      result.push(word.replace(reFirstLetters, (c) => c.toLocaleUpperCase()));
    } else {
      result.push(word);
    }
  }
  return build(result);
}
