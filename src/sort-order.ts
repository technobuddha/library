import clean from './clean.js';

type Options = {
  /** Ignore a leading quote (") */
  ignoreQuotes?: boolean;
  /** move article (a, an, the) to the end of the string */
  moveArticles?: boolean;
};

/**
 * Convert a string into a sortable string
 *
 * @remarks for example "The Beatles" becomes "Beatles, The"
 * @param input string to convert
 * @param __namedParameters see {@link Options}
 * @return sortable string
 */
export function sortOrder(
  input: string,
  { ignoreQuotes = true, moveArticles = true }: Options = {},
): string {
  let text = clean(input);

  if (ignoreQuotes && text.startsWith('"')) {
    const quote = text.slice(0, 1);
    text = text.slice(1);

    const index = text.indexOf(quote, 1);
    if (index >= 0) text = text.slice(0, index) + text.slice(index + 1);
  }

  const lc = text.toLowerCase();
  if (moveArticles) {
    if (lc.startsWith('a ')) text = `${text.slice(2)}, ${text.slice(0, 1)}`;
    else if (lc.startsWith('an ')) text = `${text.slice(3)}, ${text.slice(0, 2)}`;
    else if (lc.startsWith('the ')) text = `${text.slice(4)}, ${text.slice(0, 3)}`;
  }

  return text;
}

export default sortOrder;
