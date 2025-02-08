import { escapeRegExp, isFunction } from 'lodash-es';

import { build } from './build.js';
import { escapeJS } from './escape-js.js';

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
 * @param __namedParameters - see {@link QuoteOptions}
 * @defaultValue quote double-quote (")
 * @defaultValue escape {@link escapeJS}
 * @returns text surrounded by quotes
 */
export function quote(
  input: string,
  { quote: q = '"', escape = escapeJS }: QuoteOptions = {},
): string {
  const text =
    isFunction(escape) ?
      escape(input)
    : input.replaceAll(new RegExp(escapeRegExp(q), 'ug'), escape);

  return build(q, text, q);
}
