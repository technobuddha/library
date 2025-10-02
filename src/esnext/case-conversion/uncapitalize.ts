import { build } from '../string/build.ts';
import { hyphen, nonBreakingHyphen } from '../unicode/unicode.ts';

const reIsWord = new RegExp(`^[\\p{L}\\-${hyphen}${nonBreakingHyphen}]+$`, 'v');
const reWords = new RegExp(`([^\\p{L}\\-${hyphen}${nonBreakingHyphen}]+)`, 'v');
const reFirstLetters = new RegExp(`(?:^|[\\-${hyphen}${nonBreakingHyphen}])[\\p{L}]`, 'vg');

/**
 * Uncapitalize the first word in a sentence, or uncapitalize a single word.
 * @param input - The sentence or word to uncapitalize
 * @group Case Conversion
 * @category Capitalization
 */
export function uncapitalize(input: string): string {
  const words = input.split(reWords);
  const result: string[] = [];
  let found = false;

  for (const word of words) {
    if (!found && reIsWord.test(word)) {
      found = true;
      result.push(word.replace(reFirstLetters, (c) => c.toLocaleLowerCase()));
    } else {
      result.push(word);
    }
  }
  return build(result);
}
