import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';

export function matches(text: string, matches: string | RegExp | Iterable<string | RegExp>): boolean {
    text = text.trim().toLowerCase();

    if(isRegExp(matches)) return matches.test(text);
    if(isString(matches)) return matches.toLowerCase() === text;

    for(const match of matches) {
        if(isRegExp(match)) if(match.test(text)) return true;
        if(isString(match)) if(match.toLowerCase() === text) return true;
    }

    return false;
}

export default matches;
