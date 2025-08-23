const titles = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/iu;

/**
 * Convert a string to a title, capitalizing each word, except for the small words
 *
 * @param input - the string to make title case
 * @returns the string in title case
 * @group String
 * @category Case Conversion
 */
export function title(input: string): string {
  return input.replaceAll(
    /[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/gu,
    (match, index: number, word: string) => {
      if (
        index > 0 &&
        index + match.length !== word.length &&
        match.search(titles) > -1 &&
        word.charAt(index - 2) !== ':' &&
        (word.charAt(index + match.length) !== '-' || word.charAt(index - 1) === '-') &&
        word.charAt(index - 1).search(/[^\s-]/u) < 0
      ) {
        return match.toLocaleLowerCase();
      }

      if (match.slice(1).search(/[A-Z]|\../u) > -1) {
        return match;
      }

      return match.charAt(0).toLocaleUpperCase() + match.slice(1);
    },
  );
}
