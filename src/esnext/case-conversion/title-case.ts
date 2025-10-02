import { build } from '../string/build.ts';
import { splitTokens } from '../tokenization/split-tokens.ts';
import { isPunctuation } from '../unicode/is-punctuation.ts';
import { isWhitespace } from '../unicode/is-whitespace.ts';

/**
 * Regular expression matching common English articles, conjunctions, and prepositions for title casing.
 * @internal
 */
const defaults =
  /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|so|the|to|up|vs?\.?|via|yet)$/iv;

export type TitleCaseOptions = {
  small?: RegExp;
};

function simpleCapitalize(word: string): string {
  return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}

/**
 * Convert a string to a title, capitalizing each word, except for the small words
 * @param input - the string to make title case
 * @returns the string in title case
 * @group Case Conversion
 * @category Capitalization
 */
export function titleCase(input: string, { small = defaults }: TitleCaseOptions = {}): string {
  const tokens = splitTokens(input);
  const first = tokens.findIndex((t) => !isWhitespace(t) && !isPunctuation(t));
  const last = tokens.findLastIndex((t) => !isWhitespace(t) && !isPunctuation(t));

  return build(
    tokens.map((token, i) =>
      (
        !isWhitespace(token) &&
        !isPunctuation(token) &&
        (i === first || i === last || !small.test(token))
      ) ?
        simpleCapitalize(token)
      : token,
    ),
  );
}
