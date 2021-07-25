import clean                    from './clean';

type Options = {
    /** Ignore a leading quote (") */
    ignoreQuotes?: boolean;
    /** move article (a, an, the) to the end of the string */
    moveArticles?: boolean;
};

/**
 * Convert a string into a sortable string
 *
 * @remarks for example "The Beatles" becomes "Beatles, The"
 * @param input string to convert
 * @param __namedParameters see {@link Options}
 * @return sortable string
 */
export function sortOrder(input: string, { ignoreQuotes = true, moveArticles = true }: Options = {}): string {
    input = clean(input);

    if(ignoreQuotes && input.startsWith('"')) {
        const quote = input.slice(0, 1);
        input = input.slice(1);

        const index = input.indexOf(quote, 1);
        if(index >= 0)
            input = input.slice(0, index) + input.slice(index + 1);
    }

    const lc    = input.toLowerCase();
    if(moveArticles) {
        if(lc.startsWith('a '))
            input = `${input.slice(2)}, ${input.slice(0, 1)}`;
        else
        if(lc.startsWith('an '))
            input = `${input.slice(3)}, ${input.slice(0, 2)}`;
        else
        if(lc.startsWith('the '))
            input = `${input.slice(4)}, ${input.slice(0, 3)}`;
    }

    return input;
}

export default sortOrder;
