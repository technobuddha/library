import isNil from 'lodash/isNil';
import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';

function match(text: string, matchers: ArrayLike<string | RegExp>): boolean {
    text = text.trim().toLowerCase();

    for(let i = 0; i < matchers.length; ++i) {
        let matcher = matchers[i];
        if(isNil(matcher)) continue;
        if(isRegExp(matcher) && matcher.test(text)) return true;
        if(isString(matcher) && matcher.toLowerCase() === text) return true;
    }

    return false;
}

type Options = {
    trueValues?: ArrayLike<string | RegExp>,
    falseValues?: ArrayLike<string | RegExp>
};

const defaultTrue  = ['true',  'yes', 'y', 'on',  '1'];
const defaultFalse = ['false', 'no',  'n', 'off', '0'];

/**
  * Convert a string to a boolean value
  * @param input        The string to convert
  * @param trueValues    A list of values that are "true" (default: 'true', 'yes', 'on', or '1')
  * @param falseValues    A list of values that are "false" (default: 'false', 'no', 'off', '0')
  */
export function toBoolean(input: string, {trueValues = defaultTrue, falseValues = defaultFalse}: Options = {}): boolean | undefined {
    if(match(input, trueValues)) return true;
    if(match(input, falseValues)) return false;
    return undefined;
}

export default toBoolean;
