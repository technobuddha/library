import { escapeRegExp, isFunction } from 'lodash-es';

import build from './build';
import escapeJS from './escape-js';

export type Options = {
  /** The quote character(s) to use */
  quote?: string;
  /** Character sequence to replace the quote mark within the text, or function to return the properly escaped text */
  escape?: string | ((input: string) => string);
};

/**
 * Surround text with quotes
 *
 * @param input The text to surround
 * @param __namedParameters see {@link Options}
 * @default quote double-quote (")
 * @deffaultValue escape {@link escapeJs}
 * @returns text surrounded by quotes
 */
export function quote(input: string, { quote: q = '"', escape = escapeJS }: Options = {}): string {
  const text =
    isFunction(escape) ?
      escape(input)
    : input.replaceAll(new RegExp(escapeRegExp(q), 'ug'), escape);

  return build(q, text, q);
}

export default quote;
