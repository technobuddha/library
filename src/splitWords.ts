import isWhitespace from './isWhitespace';
import clean        from './clean';

type Options = {
    /** The delimiter between words */
    delimiter?: string | RegExp;
}

/**
 * Split a string into an array of words
 * 
 * @param input The string to split
 * @param __namedParameters see {@link Options}
 * @default delimiter whitespace
 * @returns array of words
 */
export function splitWords(input: string, {delimiter = /\s+/}: Options = {}): string[] {
    if(input.length === 0 || isWhitespace(input))
        return [];
    else
        return clean(input, delimiter).split(delimiter);
}


export default splitWords;
