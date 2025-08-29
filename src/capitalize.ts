import { splitWords } from './split-words.ts';
import { hyphen, nonBreakingHyphen, space } from './unicode.ts';

const reWord = new RegExp(`^\\w|[${hyphen}${nonBreakingHyphen}-]\\w`, 'gui');

/**
 * Capitalize the first word in a sentence, or capitalize a single word.
 * @param input - The sentence or word to capitalize
 * @group String
 * @category Case Conversion
 */
export function capitalize(input: string): string {
  const [first, ...rest] = splitWords(input);
  return [first.replaceAll(reWord, (c) => c.toLocaleUpperCase()), ...rest].join(space);
}
