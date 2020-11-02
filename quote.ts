import escapeRegExp from 'lodash/escapeRegExp';
import isFunction   from 'lodash/isFunction';
import escapeJS     from './escapeJS';
import build        from './build';

type Options = {
    quote?: string;
    escape?: string | ((input: string) => string);
}

/**
  * Surround text with quotes
  * @param input        The text to surround
  * @param quote        The quote character(s) to use (default ["])
  * @param escape        Character sequence to replace the quote mark within the text (default [\"])
  */
export function quote(input: string, {quote = '"', escape = escapeJS}: Options = {}): string {
    if(isFunction(escape))
        input = escape(input);
    else
        input = input.replace(new RegExp(escapeRegExp(quote), 'g'), escape);

    return build(quote, input, quote);
}

export default quote;
