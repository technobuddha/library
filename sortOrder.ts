import clean                    from './clean';

type Options = {
    ignoreArticles?: boolean,
    ignoreQuotes?: boolean,
}

export function sortOrder(input: string, {ignoreArticles = true, ignoreQuotes = true}: Options = {}): string {
    input = clean(input);

    const lc    = input.toLowerCase();
    if(ignoreArticles)
    {
        if(lc.startsWith('a '))
            input = input.substr(2) + ', ' + input.substr(0, 1);
        else
        if(lc.startsWith('an '))
            input = input.substr(3) + ', ' + input.substr(0, 2);
        else
        if(lc.startsWith('the '))
            input = input.substr(4) + ', ' + input.substr(0, 3);
    }

    if(ignoreQuotes)
    {
        if(input.startsWith('"'))
            input = input.substr(1);
    }

    return input;
}

export default sortOrder;

    