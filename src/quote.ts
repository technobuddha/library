import { build } from './build.ts';
import { escapeJS } from './escape-js.ts';
import { isFunction } from './is-function.ts';

/**
 * Options for the {@link quote} and {@link unquote} function
 * @group String
 * @category Quoting
 */
export type QuoteOptions = {
  /** The quote character(s) to use */
  quote?: string;
  /** Character sequence to replace the quote mark within the text, or function to return the properly escaped text */
  escape?: string | ((input: string) => string);
};

/**
 * Surround text with quotes
 *
 * @param input - The text to surround
 * @param options - see {@link QuoteOptions}
 * @defaultValue quote double-quote (")
 * @defaultValue escape {@link escapeJS}
 * @returns text surrounded by quotes
 * @group String
 * @category Quoting
 */
export function quote(
  input: string,
  { quote: q = '"', escape = escapeJS }: QuoteOptions = {},
): string {
  const text =
    isFunction(escape) ?
      escape(input)
    : input.replaceAll(new RegExp(RegExp.escape(q), 'ug'), escape);

  return build(q, text, q);
}
