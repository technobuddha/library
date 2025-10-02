import { clean } from '../string/clean.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Options for the {@link sortOrder} function
 * @group Tokenization
 * @category Sort Order
 */
export type SortOrderOptions = {
  /** Ignore a leading quote (") */
  ignoreQuotes?: boolean;
  /** move article (a, an, the) to the end of the string */
  moveArticles?: boolean;
};

/**
 * Convert a string into a sortable string
 * @remarks for example "The Beatles" becomes "Beatles, The"
 * @param text - string to convert
 * @param options - see {@link SortOrderOptions}
 * @returns sortable string
 * @group Tokenization
 * @category Sort Order
 */
export function sortOrder(
  text: StringLike,
  { ignoreQuotes = true, moveArticles = true }: SortOrderOptions = {},
): string {
  let input = clean(toString(text));

  if (ignoreQuotes && input.startsWith('"')) {
    const quote = input.slice(0, 1);
    input = input.slice(1);

    const index = input.indexOf(quote, 1);
    if (index >= 0) {
      input = input.slice(0, index) + input.slice(index + 1);
    }
  }

  const lc = input.toLocaleLowerCase();
  if (moveArticles) {
    if (lc.startsWith('a ')) {
      input = `${input.slice(2)}, ${input.slice(0, 1)}`;
    } else if (lc.startsWith('an ')) {
      input = `${input.slice(3)}, ${input.slice(0, 2)}`;
    } else if (lc.startsWith('the ')) {
      input = `${input.slice(4)}, ${input.slice(0, 3)}`;
    }
  }

  return input;
}
