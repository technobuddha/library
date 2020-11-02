import isWhitespace from './isWhitespace';
import clean        from './clean';

type Options = {
    delimiter?: string | RegExp;
}

/**
  * Split a string into an array of words within the string
  * @param input        The string to split
  */
export function splitWords(input: string, {delimiter = /\s+/}: Options = {}): string[] {
    if(isWhitespace(input))
        return [];
    else
        return clean(input, delimiter).split(delimiter);
}


export default splitWords;
