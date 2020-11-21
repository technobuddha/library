import escapeRegExp     from 'lodash/escapeRegExp';
import { empty, space } from './constants';
import getIndent        from './getIndent';

export type Options = {
    /** the indentation character */
    indenter?: string
}

/**
 * Remove indentation from text
 * 
 * @param input The indented text
 * @param pattern  (space)
 */
export function unindent(input: string, {indenter = space}: Options = {}): string {
    const indent = getIndent(input, { indenter });

    if(indent === 0)
        return input;
        
    return input.replace(new RegExp('^(' + escapeRegExp(indenter) + '){' + indent + '}', 'gm'), empty);
}

export default unindent;
