import escapeRegExp from 'lodash/escapeRegExp';
import isFunction   from 'lodash/isFunction';
import escapeJS     from './escapeJS';
import build        from './build';

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
 * @deffaultValue escape {@link esapeJs}
 * @returns text surrounded by quotes
 */
export function quote(input: string, { quote: q = '"', escape = escapeJS }: Options = {}): string {
    if(isFunction(escape))
        input = escape(input);
    else
        input = input.replace(new RegExp(escapeRegExp(q), 'ug'), escape);

    return build(q, input, q);
}

export default quote;
