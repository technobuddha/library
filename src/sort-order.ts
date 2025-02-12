import { clean } from './clean.js';

/**
 * @group String
 * @category Sorting
 */
export type SortOrderOptions = {
  /** Ignore a leading quote (") */
  ignoreQuotes?: boolean;
  /** move article (a, an, the) to the end of the string */
  moveArticles?: boolean;
};

/**
 * Convert a string into a sortable string
 *
 * @remarks for example "The Beatles" becomes "Beatles, The"
 * @param text - string to convert
 * @param __namedParameters - see {@link SortOrderOptions}
 * @returns sortable string
 * @group String
 * @category Sorting
 */
export function sortOrder(
  text: string,
  { ignoreQuotes = true, moveArticles = true }: SortOrderOptions = {},
): string {
  let input = clean(text);

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
