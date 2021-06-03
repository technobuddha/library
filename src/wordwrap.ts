import { empty, space }  from './constants';
import splitWords        from './splitWords';

type Options = {
    /** The width to wrap to */
    width?: number;
    /** Line separator */
    separator?: string;
    /** If true, don't limit breaks to word boundaries */
    cut?: boolean;
    /** If true, spaces are added to the end of each line to make all lines equal width, ignored if cut or preserveSpaces is true */
    trailingSpaces?: boolean;
};

/**
 * Wrap text so that it fits within a area of fixed width
 *
 * @param input the text to wrap
 * @param options
 * @default width 75
 * @default separator \n
 * @default cut default false
 * @default trailingSpaces false
 * @returns wrapped text
 */
export function wordwrap(input: string, { width = 75, separator = '\n', cut = false, trailingSpaces = false }: Options = {}): string {
    if(width <= 0) {
        return input;
    } else if(cut) {
        let result = empty;

        // walk through each character and add separators where appropriate
        for(let i = 0; i < input.length; ++i) {
            if(i % width === 0 && i > 0)
                result += separator;
            result += input.charAt(i);
        }

        // fill the rest of the line with spaces if trailingSpaces option is true
        if(trailingSpaces)
            result += space.repeat(width - input.length % width);

        return result;
    }
    let currentColumn = 0;
    let result = empty;

    for(const word of splitWords(input)) {
        // if adding a space and the next word would cause this line to be longer than width...
        if(word.length + currentColumn > width) {
            if(trailingSpaces) {
                // fill the rest of the line with spaces if trailingSpaces option is true
                result += space.repeat(width - currentColumn);
            }

            //start new line
            result += separator;
            currentColumn = 0;
        }

        // if not at the begining of the line, add a space in front of the word
        if(currentColumn > 0) {
            result += space;
            currentColumn++;
        }

        // tack on the next word, update current column, a pop words array
        result += word;
        currentColumn += word.length;
    }

    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces) {
        while(currentColumn++ < width)
            result += space;
    }

    return result;
}

export default wordwrap;
