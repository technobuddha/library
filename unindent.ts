import escapeRegExp     from 'lodash/escapeRegExp';
import { empty }        from './constants';
import getIndent        from './getIndent';

type Options = {
    indenter?: string
}

/**
  * Remove indentation from text
  * @param input        The indented text
  * @param pattern        String or RegExp used to determine the indentation character (default: whitespace)
  */
export function unindent(input: string, {indenter = '\t'}: Options = {}): string {
    let indent = getIndent(input, { indenter });
    if(indent === 0)
        return input;
    else
        return input.replace(new RegExp('^(' + escapeRegExp(indenter) + '){' + indent + '}', 'gm'), empty);
}

export default unindent;
