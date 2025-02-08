import { escapeRegExp, isString } from 'lodash-es';

import { unescapeJS } from './unescape-js.js';

export type UnquoteOptions = {
  /** The quote character(s) to use */
  quote?: string;
  /** Character sequence to replace the quote mark within the text */
  escape?: string | ((input: string) => string);
};

/**
 * Remove surrounding quotes from text
 *
 * @param input - The text to surrounded by quotes
 * @param __namedParameters - see {@link UnquoteOptions}
 * @defaultValue quote double-quote (")
 * @defaultValue escape unescapeJS
 * @returns the unescaped text with quotes removed
 */
export function unquote(
  input: string,
  { quote = '"', escape = unescapeJS }: UnquoteOptions = {},
): string {
  let text = input;
  if (text.startsWith(quote) && text.endsWith(quote)) {
    text = text.slice(quote.length, text.length - quote.length);
    if (isString(escape)) {
      return text.replaceAll(new RegExp(escapeRegExp(escape), 'gu'), quote);
    }
    return escape(text);
  }
  return text;
}
