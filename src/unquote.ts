import { isString } from './is-string.ts';
import { type QuoteOptions } from './quote.ts';
import { unescapeJS } from './unescape-js.ts';

/**
 * Remove surrounding quotes from text
 * @param input - The text to surrounded by quotes
 * @param options - see {@link QuoteOptions}
 * @defaultValue quote double-quote (")
 * @defaultValue escape unescapeJS
 * @returns the unescaped text with quotes removed
 * @group String
 * @category Quoting
 */
export function unquote(
  input: string,
  { quote = '"', escape = unescapeJS }: QuoteOptions = {},
): string {
  let text = input;
  if (text.startsWith(quote) && text.endsWith(quote)) {
    text = text.slice(quote.length, text.length - quote.length);
    if (isString(escape)) {
      return text.replaceAll(new RegExp(RegExp.escape(escape), 'gu'), quote);
    }
    return escape(text);
  }
  return text;
}
