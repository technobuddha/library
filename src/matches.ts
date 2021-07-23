import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';

export function matches(text: string, match: string | RegExp | Iterable<string | RegExp>): boolean {
    text = text.trim().toLowerCase();

    if(isRegExp(match)) return match.test(text);
    if(isString(match)) return match.toLowerCase() === text;

    for(const m of match)
        if((isRegExp(m) && m.test(text)) || (isString(m) && m.toLowerCase() === text)) return true;

    return false;
}

export default matches;
