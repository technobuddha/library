import { empty, space }  from './constants';
import splitWords        from './splitWords';

type Options = {
    width?: number,
    separator?: string,
    cut?: boolean,
    preserveSpaces?: boolean,
    trailingSpaces?: boolean
}

/**
  * Wrap text so that it fits within a area of fixed width
  * @param input        The text to wrap
  * @param options
  * {
  *        width:            The width to wrap to (default 75)
  *        separator:        Line separator (default \n)
  *        cut:            If true, dont limit breaks to word boundries (default false)
  *        preserveSpaces:    If true, a space is preserved at the end of each line (default false - ignored if cut is true)
  *        trailingSpaces:    If true, spaces are added to the end of each line to make all lines equal width (default false - ignored if cut or preserveSpaces is true)
  * }
  */
export function wordwrap(input: string, {width = 75, separator = '\n', cut = false, preserveSpaces = false, trailingSpaces = false}: Options = {}): string {
    if(width <= 0)
        return input;
    else if(cut) {
        let result = empty;

        // walk through each character and add separators where appropriate
        for(let i = 0; i < input.length; ++i) {
            if(i % width === 0 && i > 0)
                result += separator;
            result += input.charAt(i);
        }

        // fill the rest of the line with spaces if trailingSpaces option is true
        if(trailingSpaces)
            result += space.repeat(input.length % width);

        return result;
    } else {
        let currentColumn = 0;
        let result = empty;

        for(const word of splitWords(input)) {
            // if adding a space and the next word would cause this line to be longer than width...
            if(word.length + currentColumn > width) {
                //start a new line if this line is not already empty
                if(currentColumn > 0) {
                    // add a space at the end of the line is preserveSpaces is true
                    if(preserveSpaces) {
                        result += space;
                        currentColumn++;
                    } else if(trailingSpaces)
                        // fill the rest of the line with spaces if trailingSpaces option is true
                        result += space.repeat(width - currentColumn);

                    //start new line
                    result += separator;
                    currentColumn = 0;
                }
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
}

export default wordwrap;
