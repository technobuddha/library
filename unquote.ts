import isString     from 'lodash/isString';
import escapeRegExp from 'lodash/escapeRegExp';
import unescapeJS   from './unescapeJS';

type Options = {
    /** The quote character(s) to use */
    quote?: string;
    /** Character sequence to replace the quote mark within the text */
    escape?: (string | ((input: string) => string));
}

/**
 * Remove surrounding quotes from text
 * 
 * @param input The text to surrounded by quotes
 * @param __namedParameters see {@link Options}
 * @default quote double-quote (")
 * @default escape unescapeJS
 * @returns the unescaped text with quotes removed
 */
export function unquote(input: string, {quote = '"', escape = unescapeJS}: Options = {}): string {
    if(input.startsWith(quote) && input.endsWith(quote)) {
        input = input.slice(quote.length, input.length - quote.length);
        if(isString(escape))
            return input.replace(new RegExp(escapeRegExp(escape), 'g'), quote);
        else
            return escape(input);
    }
    else
        return input;
}

export default unquote;
