import { build } from './build.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link quote} and {@link unquote} function
 * @group String
 * @category Construction
 */
export type QuoteOptions = {
  /**
   * The quote to surround the text with
   *
   * - `double` - use double quotes (")
   * - `single` - use single quotes (')
   * - `prefer-double` - use double quotes unless the text contains double quotes, then use single quotes
   * - `prefer-single` - use single quotes unless the text contains single quotes, then use double quotes
   */
  quote?: 'double' | 'single' | 'prefer-double' | 'prefer-single';
  /**
   * Method to escape quote characters within the text
   *
   * - `backslash` - use backslash to escape quotes (e.g., "\\"hello\\"")
   * - `repeat` - repeat the quote character (e.g., """hello""")
   */
  escape?: 'backslash' | 'repeat';
};

/**
 * Surrounds the given text with quotes based on the specified options.
 *
 * @param text - The text to surround with quotes.
 * @param options - Configuration options for quoting behavior. See {@link QuoteOptions}.
 * @returns The input text surrounded by the specified quote character.
 *
 * @example
 * ```typescript
 * quote('Hello, world!'); // 'Hello, world!'
 * quote("It's a test", { quote: 'double' }); // "It\'s a test"
 * quote('She said, "Hello!"', { escape: 'repeat' }); // 'She said, ""Hello!""'
 * ```
 *
 * @group String
 * @category Construction
 */
export function quote(
  text: StringLike,
  { quote = 'prefer-single', escape = 'backslash' }: QuoteOptions = {},
): string {
  const input = toString(text);
  const q = determineQuote(input, quote);

  if (escape === 'backslash') {
    return build(q, input.replaceAll(q, `\\${q}`), q);
  }

  return build(q, input.replaceAll(q, q + q), q);
}

/**
 * Determines the appropriate quote character to use based on the input and quoting preference.
 *
 * @param input - The text to analyze for quote selection.
 * @param quoteOption - The quoting preference. See {@link QuoteOptions.quote}.
 * @returns The selected quote character (single or double).
 *
 * @example
 * ```typescript
 * determineQuote('Hello', 'prefer-single'); // "'
 * determineQuote('"Hello"', 'prefer-double'); // "'
 * ```
 *
 * @internal
 */
export function determineQuote(
  input: string,
  quoteOption: NonNullable<QuoteOptions['quote']>,
): string {
  const hasSingle = input.includes("'");
  const hasDouble = input.includes('"');

  switch (quoteOption) {
    case 'double': {
      return '"';
    }

    case 'single': {
      return "'";
    }

    case 'prefer-single': {
      return hasSingle && !hasDouble ? '"' : "'";
    }

    case 'prefer-double': {
      return hasDouble && !hasSingle ? "'" : '"';
    }

    /* v8 ignore next 3 */
    default: {
      return '"';
    }

    // no default
  }
}
